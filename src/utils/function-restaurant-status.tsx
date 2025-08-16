import { DayOfWeek, OpeningHour } from "../types/types-schedules.d";

export const getRestaurantStatus = ( openingHours: OpeningHour[] ) => {
    const days: DayOfWeek[] = ['domingo', 'segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado'];
    const currentDayIndex = new Date().getDay();
    const currentDay = days[currentDayIndex];

    const todaySchedule = openingHours.find(s => s.day === currentDay);

    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();

    if (
        !todaySchedule ||
        !todaySchedule.isOpen ||
        !Array.isArray(todaySchedule.timeRanges) ||
        !todaySchedule.timeRanges.length
    ) {
        return findNextOpenDay(currentDayIndex, openingHours);
    }

    let willOpenToday: string | null = null;
    for (const { start, end } of todaySchedule.timeRanges) {
        const [openHour, openMinute] = start.split(':').map(Number);
        const [closeHour, closeMinute] = end.split(':').map(Number);
        const openTime = openHour * 60 + openMinute;
        const closeTime = closeHour * 60 + closeMinute;

        if (currentTime < openTime) {
            willOpenToday = start;
            break;
        }
        if (currentTime >= openTime && currentTime < closeTime) {
            return {
                isOpen: true,
                message: `Fecha às ${end}`,
            };
        }
    }

    if (willOpenToday) {
        return {
            isOpen: false,
            message: `Abre hoje às ${willOpenToday}`,
        };
    }

    return findNextOpenDay(currentDayIndex, openingHours);
};

const findNextOpenDay = (
    startIndex: number,
    openingHours: OpeningHour[]
) => {
    const days: DayOfWeek[] = ['domingo', 'segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado'];

    for (let i = 1; i <= 7; i++) {
        const nextIndex = (startIndex + i) % 7;
        const nextDay = days[nextIndex];
        const schedule = openingHours.find(
            s => s.day === nextDay && s.isOpen && Array.isArray(s.timeRanges) && s.timeRanges.length > 0
        );

        if (schedule) {
            return {
                isOpen: false,
                message: `Abre ${dayDisplay[nextDay]} às ${schedule.timeRanges[0].start}`,
            };
        }
    }

    return { isOpen: false, message: "Fechado" };
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