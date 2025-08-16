export type DayOfWeek = 'segunda' | 'terca' | 'quarta' | 'quinta' | 'sexta' | 'sabado' | 'domingo';

type TimeRange = {
  start: string;
  end: string;
};

export type OpeningHour = {
    day: DayOfWeek;
    isOpen: boolean;
    status: string;
    timeRanges: TimeRange[];
};