import { useState, useEffect } from "react";
import { useRestaurantData } from "../../../context/restaurant-data/restaurant-data-context";
import { UpdateDataForm } from "./deafult/form-update-data";
import { checkOverlappingRanges, validateOpeningHours } from "../../../utils/function-validate-opening-hours";
import { OpeningHour } from "../../../types/types-schedules.d";
import { UpdateSchedulesStoreFormProps } from "../../../types/types-data-forms.d";
import { AiFillCloseSquare } from "react-icons/ai";
import { LuClock4 } from "react-icons/lu";

export const UpdateSchedulesForm: React.FC<UpdateSchedulesStoreFormProps> = ({
    onClose,
}) => {

    const { restaurantData, updateRestaurantSchedules } = useRestaurantData();

    const [error, setError] = useState("");
    const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});
    const [loading, setLoading] = useState(false);
    const [openingHours, setOpeningHours] = useState<OpeningHour[]>([]);
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        const fetchStoreSchedules = async () => {
            setLoading(true);
            try {
                setOpeningHours(restaurantData?.openingHours ?? []);
            } catch (error: unknown) {
                setError(error instanceof Error ? error.message : "Erro ao carregar os dados da loja");
            } finally {
                setLoading(false);
            }
        };
        fetchStoreSchedules();
    }, [restaurantData?.openingHours]);

    useEffect(() => {
        if (successMessage) {
            const timer = setTimeout(() => setSuccessMessage(""), 3000);
            return () => clearTimeout(timer);
        }
    }, [successMessage]);

    const orderedOpeningHours = openingHours.sort((a, b) => {
        const dayOrder: { [key: string]: number } = {
            'segunda': 0,
            'terca': 1,
            'quarta': 2,
            'quinta': 3,
            'sexta': 4,
            'sabado': 5,
            'domingo': 6
        };
        return dayOrder[a.day] - dayOrder[b.day];
    });

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccessMessage("");
        setFieldErrors({});

        const schedule = openingHours.map(({ day, timeRanges }) => ({
            day,
            timeRanges,
            isOpen: timeRanges.length > 0,
            status: "",
        }));

        const fieldErrors: { [key: string]: string } = {};
        let hasError = false;
        schedule.forEach((range, idx) => {
            range.timeRanges.forEach((tr, trIdx) => {
                if (!tr.start || !tr.end) {
                    fieldErrors[`${idx}-${trIdx}-start`] = "Obrigatório";
                    fieldErrors[`${idx}-${trIdx}-end`] = "Obrigatório";
                    hasError = true;
                } else if (tr.start >= tr.end) {
                    fieldErrors[`${idx}-${trIdx}-start`] = "Início deve ser menor que fim";
                    fieldErrors[`${idx}-${trIdx}-end`] = "Fim deve ser maior que início";
                    hasError = true;
                }
            });
        });

        const validationError = validateOpeningHours(schedule) || checkOverlappingRanges(schedule);

        if (hasError || validationError) {
            setFieldErrors(fieldErrors);
            setError(validationError || "Corrija os campos destacados.");
            return;
        }

        setLoading(true);
        try {
            await updateRestaurantSchedules({ schedule });
            setSuccessMessage("Horários atualizados com sucesso!");
        } catch (error: unknown) {
            setError(error instanceof Error ? error.message : "Erro ao atualizar os horários da loja");
        } finally {
            setLoading(false);
        }
    };

    const dayDisplay: { [key: string]: string } = {
        segunda: "Segunda",
        terca: "Terça",
        quarta: "Quarta",
        quinta: "Quinta",
        sexta: "Sexta",
        sabado: "Sábado",
        domingo: "Domingo"
    };

    return (
        <UpdateDataForm
            onClose={onClose}
            error={error}
            fieldErrors={fieldErrors}
            loading={loading}
            formIcon={<LuClock4 />}
            title="Horários de Funcionamento"
            textButtonSubmit="Salvar horários"
            submitFunction={handleFormSubmit}
            successMessage={successMessage}
        >
            {orderedOpeningHours.map((oh, idx) => (
                <div
                    key={oh.day}
                    className={`w-full max-w-96 p-3 mb-2 mx-auto flex flex-col items-center justify-center ${idx !== 0 ? "border-t-1 border-zinc-300 dark:border-zinc-700" : ""}`}
                >
                    <div className="mb-2 flex items-center gap-2">
                        <div className="w-full flex flex-col items-center justify-center">
                            <h4 className="font-bold capitalize">{dayDisplay[oh.day] || oh.day}</h4>
                            <div className="flex gap-4">
                                <label className="flex items-center gap-1 cursor-pointer">
                                    <input
                                        type="radio"
                                        name={`opening-status-${idx}`}
                                        checked={oh.timeRanges.length > 0}
                                        onChange={() => {
                                            setOpeningHours(prev => prev.map((item, i) =>
                                                i === idx ? { ...item, timeRanges: [{ start: '09:00', end: '18:00' }] } : item
                                            ));
                                        }}
                                        className="accent-primary"
                                    />
                                    <span className="font-extralight">Aberto</span>
                                </label>
                                <label className="flex items-center gap-1 cursor-pointer">
                                    <input
                                        type="radio"
                                        name={`opening-status-${idx}`}
                                        checked={oh.timeRanges.length === 0}
                                        onChange={() => {
                                            setOpeningHours(prev => prev.map((item, i) =>
                                                i === idx ? { ...item, timeRanges: [] } : item
                                            ));
                                        }}
                                        className="accent-primary"
                                    />
                                    <span className="font-extralight">Fechado</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-6">
                        {oh.timeRanges.map((tr, trIdx) => (
                            <div key={trIdx} className="relative flex flex-col items-center justify-center gap-2">
                                <div className="w-[138px] relative flex items-center justify-end gap-2">
                                    <label htmlFor="">Abre</label>
                                    <input
                                        type="time"
                                        value={tr.start}
                                        onChange={e => {
                                            const updated = [...openingHours];
                                            updated[idx].timeRanges[trIdx].start = e.target.value;
                                            setOpeningHours(updated);
                                        }}
                                        className={`w-[92px] border px-2 py-1 rounded${fieldErrors[`${idx}-${trIdx}-start`] ? " border-red-500" : ""}`}
                                    />
                                    {fieldErrors[`${idx}-${trIdx}-start`] && (
                                        <span className="min-w-[92px] max-w-[200px] absolute top-[-20px] left-1/2 -translate-x-1/3 text-sm text-red-600 text-center whitespace-nowrap">{fieldErrors[`${idx}-${trIdx}-start`]}</span>
                                    )}
                                </div>
                                <div className="w-[138px] flex items-center justify-end gap-2">
                                    <label htmlFor="">Fecha</label>
                                    <input
                                        type="time"
                                        value={tr.end}
                                        onChange={e => {
                                            const updated = [...openingHours];
                                            updated[idx].timeRanges[trIdx].end = e.target.value;
                                            setOpeningHours(updated);
                                        }}
                                        className="w-[92px] border px-2 py-1 rounded"
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={() => {
                                        const updated = [...openingHours];
                                        updated[idx].timeRanges.splice(trIdx, 1);
                                        setOpeningHours(updated);
                                    }}
                                    className="h-full text-xl border-l-3 text-red-600 absolute right-[-28px] cursor-pointer -translate-x-4"
                                >
                                    <AiFillCloseSquare />
                                </button>
                            </div>
                        ))}
                        {oh.timeRanges.length > 0 && (
                            <button
                                type="button"
                                onClick={() => {
                                    const updated = [...openingHours];
                                    updated[idx].timeRanges.push({ start: "", end: "" });
                                    setOpeningHours(updated);
                                }}
                                className="bg-primary text-sm px-2 py-1 rounded-full text-black duration-200 cursor-pointer"
                            >
                                + Adicionar horário
                            </button>
                        )}
                    </div>
                </div>
            ))}
        </UpdateDataForm>
    )
};