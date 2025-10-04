import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IoCalendarOutline } from "react-icons/io5";

type DateFilterType = "year" | "single-date" | "date-range";

type DateFilterValue =
    | { type: "year"; year: string }
    | { type: "single"; date: Date }
    | { type: "range"; start: Date; end: Date };

type CustomDatePickerProps = {
    filterType: DateFilterType;
    value?: DateFilterValue;
    onDateChange?: (value: DateFilterValue) => void;
};

export const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
    filterType,
    value,
    onDateChange,
}) => {
    const getDefaultYear = () => new Date().getFullYear().toString();

    const getToday = () => {
        const today = new Date();
        today.setHours(23, 59, 59, 999);
        return today;
    };

    const today = getToday();

    const [year, setYear] = useState(value && "year" in value ? value.year : getDefaultYear());
    const [singleDate, setSingleDate] = useState(value && "date" in value ? value.date : today);
    const [startDate, setStartDate] = useState(
        value && "start" in value ? value.start : today
    );
    const [endDate, setEndDate] = useState(
        value && "end" in value ? value.end : today
    );

    const handleYearChange = (newYear: string) => {
        setYear(newYear);
        if (onDateChange) {
            onDateChange({ type: "year", year: newYear });
        }
    };

    const handleSingleDateChange = (date: Date | null) => {
        if (date) {
            const newDate = new Date(date);
            newDate.setHours(0, 0, 0, 0);
            setSingleDate(newDate);
            if (onDateChange) {
                onDateChange({ type: "single", date: newDate });
            }
        }
    };

    const handleRangeDateChange = (date: Date | null, type: "start" | "end") => {
        if (date) {
            const newDate = new Date(date);

            if (type === "start") {
                newDate.setHours(0, 0, 0, 0);
                if (newDate > endDate) {
                    const updatedEndDate = new Date(newDate.getTime());
                    updatedEndDate.setHours(23, 59, 59, 999);
                    setEndDate(updatedEndDate);
                    setStartDate(newDate);
                    if (onDateChange) onDateChange({ type: "range", start: newDate, end: updatedEndDate });
                } else {
                    setStartDate(newDate);
                    if (onDateChange) onDateChange({ type: "range", start: newDate, end: endDate });
                }
            } else {
                newDate.setHours(23, 59, 59, 999);
                if (newDate >= startDate) {
                    setEndDate(newDate);
                    if (onDateChange) onDateChange({ type: "range", start: startDate, end: newDate });
                }
            }
        }
    };

    const renderYearPicker = () => {
        const currentYear = new Date().getFullYear();
        const years = Array.from({ length: 10 }, (_, i) => (currentYear - 5 + i).toString());

        return (
            <div className="w-fit h-fit px-2.5 py-1.5 rounded-lg flex flex-col ms:flex-row items-center gap-2 border-1 z-50">
                <div className="w-full flex items-center gap-2">
                    <span className="text-lg">Ano:</span>
                    <select
                        value={year}
                        onChange={(e) => handleYearChange(e.target.value)}
                        className="cursor-pointer rounded px-2 py-1 border-none focus:outline-none "
                    >
                        {years.map((y) => (
                            <option
                                key={y}
                                value={y}
                                className="text-black"
                            >
                                {y}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        );
    };

    const renderSingleDatePicker = () => (
        <div className="w-fit h-fit px-2.5 py-1.5 rounded-lg flex flex-col ms:flex-row items-center gap-2 border-1 z-50 translate-y-10 ss:translate-y-0">
            <div className="w-full flex items-center gap-2">
                <span className="text-lg">Data:</span>
                <DatePicker
                    selected={singleDate}
                    onChange={handleSingleDateChange}
                    dateFormat="dd/MM/yyyy"
                    portalId="root-portal"
                    className="cursor-pointer"
                    customInput={
                        <button className="flex items-center gap-2">
                            {singleDate.toLocaleDateString()}
                            <IoCalendarOutline className="text-2xl" />
                        </button>
                    }
                />
            </div>
        </div>
    );

    const renderDateRangePicker = () => {
        const renderDatePicker = (
            label: string,
            selectedDate: Date,
            type: "start" | "end",
        ) => (
            <div className="w-fit h-fit px-2.5 py-1.5 rounded-lg flex flex-col ms:flex-row items-center gap-2 border-1 z-50">
                <div
                    className="w-full flex items-center gap-2 sm:pr-2"
                >
                    <span className="text-lg">{label}</span>
                    <DatePicker
                        selected={selectedDate}
                        onChange={(date) => handleRangeDateChange(date, type)}
                        dateFormat="dd/MM/yyyy"
                        portalId="root-portal"
                        minDate={type === "end" ? startDate : undefined}
                        className="cursor-pointer"
                        customInput={
                            <button className="flex items-center gap-2">
                                {selectedDate.toLocaleDateString()}
                                <IoCalendarOutline className="text-2xl" />
                            </button>
                        }
                    />
                </div>
            </div>
        );

        return (
            <>
                {renderDatePicker("De:", startDate, "start")}
                {renderDatePicker("Até:", endDate, "end")}
            </>
        );
    };

    const renderContent = () => {
        switch (filterType) {
            case "year":
                return renderYearPicker();
            case "single-date":
                return renderSingleDatePicker();
            case "date-range":
                return renderDateRangePicker();
            default:
                return null;
        }
    };

    return (
        <div className="w-full max-w-[1400px] flex flex-wrap items-center justify-center md:justify-start mt-6 px-8 gap-3">
            {renderContent()}
        </div>
    );
};