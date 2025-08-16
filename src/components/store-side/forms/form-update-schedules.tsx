import { useState, useEffect } from "react";
import { getMyStoreData } from "../../../services/service-store-data";
import { updateSchedules } from "../../../services/service-update-schedules";
import { checkOverlappingRanges, validateOpeningHours } from "../../../utils/function-validate-opening-hours";
import { OpeningHour } from "../../../types/types-schedules.d";
import { UpdateSchedulesStoreFormProps } from "../../../types/types-data-forms.d";
import { LoadingComponent } from "../../component-loading";
import { ErrorComponent } from "../../component-error";
import { AiFillCloseSquare } from "react-icons/ai";
import { IoCloseOutline } from "react-icons/io5";

export const UpdateSchedulesForm: React.FC<UpdateSchedulesStoreFormProps> = ({
    onClose,
}) => {
    const [error, setError] = useState("");
    const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});
    const [loading, setLoading] = useState(false);
    const [openingHours, setOpeningHours] = useState<OpeningHour[]>([]);
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        const fetchStoreSchedules = async () => {
            setLoading(true);
            try {
                const response = await getMyStoreData();
                setOpeningHours(response.openingHours);
            } catch (error: unknown) {
                setError(error instanceof Error ? error.message : "Erro ao carregar os dados da loja");
            } finally {
                setLoading(false);
            }
        };
        fetchStoreSchedules();
    }, []);

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
            await updateSchedules({ schedule });
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
        <>
            {error && !fieldErrors ? (
                <div className="w-screen h-screen flex items-center justify-center fixed z-30 bg-white/10 backdrop-blur-sm">
                    <div className="w-120 h-90 mx-3 p-5 pt-25 pb-20 border border-zinc-400 bg-white rounded-xl flex flex-col items-center justify-center absolute z-50">
                        <button
                            type="button"
                            className="top-2 right-2 p-2 rounded-full bg-red-600 text-white absolute cursor-pointer transition-all duration-200"
                            onClick={onClose}
                        >
                            <IoCloseOutline className="text-lg" />
                        </button>
                        <ErrorComponent message={error} />
                    </div>
                </div>
            ) : loading ? (
                <div className="w-screen h-screen flex items-center justify-center fixed z-30 bg-white/10 backdrop-blur-sm">
                    <div className="w-120 h-90 mx-3 p-5 pt-25 pb-20 border border-zinc-400 bg-white rounded-xl flex flex-col items-center justify-center absolute z-50">
                        <button
                            type="button"
                            className="top-2 right-2 p-2 rounded-full bg-red-600 text-white absolute cursor-pointer transition-all duration-200"
                            onClick={onClose}
                        >
                            <IoCloseOutline className="text-lg" />
                        </button>
                        <LoadingComponent />
                    </div>
                </div>
            ) : (
                <div className="fixed inset-0 max-h-screen flex items-center justify-center z-50 overflow-y-auto">
                    <div className="fixed inset-0 bg-white/10 backdrop-blur-sm z-40"></div>
                    <form
                        id="update-schedules-form"
                        onSubmit={handleFormSubmit}
                        noValidate
                        className="w-120 max-w-115 mx-3 mt-10 mb-10 px-5 pb-4 text-base border border-zinc-400 rounded-xl bg-white relative z-50 max-h-[80vh] translate-y-[-3vh] flex flex-col items-center overflow-y-auto"
                    >
                        <div className="w-full py-4 sticky top-0 left-0 z-50 flex items-center justify-center bg-white">
                            <h2 className="mx-10 text-xl font-bold text-center">Horários de Funcionamento</h2>
                            <button
                                type="button"
                                className="top-0 right-0 m-2 p-2 rounded-full bg-red-600 text-white absolute translate-x-[50%] cursor-pointer transition-all duration-200"
                                onClick={onClose}
                            >
                                <IoCloseOutline className="text-lg" />
                            </button>
                        </div>
                        {successMessage && (
                            <p className="text-green-600 font-bold">{successMessage}</p>
                        )}
                        {orderedOpeningHours.map((oh, idx) => (
                            <div key={oh.day} className="w-full p-3 mb-2 flex flex-col items-center justify-center border-t-1 border-zinc-300">
                                <div className="mb-2 flex items-center gap-2">
                                    <div className="w-full flex flex-col items-center justify-center">
                                        <span className="font-bold capitalize">{dayDisplay[oh.day] || oh.day}</span>
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
                                                    className="accent-blue-600"
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
                                                    className="accent-blue-600"
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
                                                    <span className="min-w-[92px] max-w-[200px] absolute top-[-20px] left-1/2 -translate-x-1/2 text-xs text-red-600 text-center whitespace-nowrap">{fieldErrors[`${idx}-${trIdx}-start`]}</span>
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
                                                className="h-full text-xl border-l-3 text-red-600 absolute right-[-28px] cursor-pointer"
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
                                            className="bg-blue-600 text-sm px-2 py-1 rounded-full text-white hover:scale-103 transition-all duration-200 cursor-pointer"
                                        >
                                            + Adicionar horário
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </form>
                    <div className="w-full absolute left-1/2 flex justify-center z-50" style={{ bottom: "4vh", transform: "translateX(-50%)" }}>
                        <button
                            type="submit"
                            form="update-schedules-form"
                            className="w-[320px] max-w-[90vw] primary-button"
                        >
                            Salvar horários
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};