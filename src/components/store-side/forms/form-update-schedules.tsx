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
import { LuClock4 } from "react-icons/lu";

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

    console.log(error)

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
                <div className="fixed inset-0 bg-white/10 backdrop-blur-sm overflow-hidden z-50">
                    <div className="h-full w-full overflow-y-auto">
                        <div className="min-h-full min-w-full flex justify-center items-center">
                            <div className="w-[90%] max-w-[950px] flex flex-col my-4 md:shadow-2xl">
                                <div className="h-30 bg-primary dark:bg-[#161a21] flex justify-center items-center rounded-t-xl relative overflow-hidden">
                                    <div className="flex">
                                        <LuClock4 size={40} className="text-white dark:text-primary mx-2 hidden md:block" />
                                        <picture className="flex">
                                            {/* Imagem para mobile */}
                                            <source
                                                srcSet="./text-clocks-mobile.png"
                                                media="(max-width: 767px)"
                                                width={180}
                                                className="" />
                                            {/* Imagem para desktop */}
                                            <img
                                                src="./text-clocks-desktop.png"
                                                alt="Horários"
                                                width={300}
                                                className="max-h-[80px] h-auto object-contain"
                                            />
                                        </picture>
                                    </div>
                                    <button
                                        type="button"
                                        className="absolute top-2 right-2 p-2 rounded-full bg-red-600 text-white cursor-pointer transition-all duration-200"
                                        onClick={onClose}
                                    >
                                        <IoCloseOutline className="text-lg" />
                                    </button>
                                </div>
                                <form
                                    id="update-schedules-form"
                                    onSubmit={handleFormSubmit}
                                    noValidate
                                    className="w-full min-h-130 md:min-h-150 relative rounded-xl rounded-t-none pb-8 px-4 flex flex-col justify-start md:justify-between items-center gap-4 bg-white dark:bg-[#202326] shadow-2xl md:shadow-none dark:text-white"
                                >
                                    {successMessage && (
                                        <p className="text-green-600 font-bold">{successMessage}</p>
                                    )}
                                    {orderedOpeningHours.map((oh, idx) => (
                                        <div
                                            key={oh.day}
                                            className={`w-full max-w-96 p-3 mb-2 flex flex-col items-center justify-center ${idx !== 0 ? "border-t-1 border-zinc-300 dark:border-zinc-700" : ""}`}
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
                                                        className="bg-primary text-sm px-2 py-1 rounded-full text-black hover:scale-103 transition-all duration-200 cursor-pointer"
                                                    >
                                                        + Adicionar horário
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                    {error && (
                                        <p className="text-red-600 text-sm text-center mt-2">{error}</p>
                                    )}
                                    <div className="w-full flex justify-center z-50">
                                        <button
                                            type="submit"
                                            form="update-schedules-form"
                                            className="w-[320px] max-w-[90vw] primary-button"
                                        >
                                            Salvar horários
                                        </button>
                                    </div>
                                </form>

                            </div >
                        </div >
                    </div >
                </div >
            )}
        </>
    );
};