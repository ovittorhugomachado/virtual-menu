import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IoCalendarOutline } from "react-icons/io5";

type CustomDatePickerProps = {
    onDateChange?: (startDate: Date, endDate: Date) => void;
};

export const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
    onDateChange,
}) => {
    const getStartOfMonth = () => {
        const now = new Date();
        return new Date(now.getFullYear(), now.getMonth(), 1);
    };

    const getToday = () => {
        const today = new Date();
        today.setHours(23, 59, 59, 999);
        return today;
    };

    const [startDate, setStartDate] = useState(getStartOfMonth());
    const [endDate, setEndDate] = useState(getToday());

    const handleDateChange = (
        date: Date | null,
        type: "start" | "end"
    ) => {
        if (date) {
            const newDate = new Date(date);

            if (type === "start") {
                newDate.setHours(0, 0, 0, 0);
                if (newDate > endDate) {
                    setEndDate(new Date(newDate.getTime()));
                }
                setStartDate(newDate);
                if (onDateChange) onDateChange(newDate, endDate);
            } else {
                newDate.setHours(23, 59, 59, 999);
                if (newDate >= startDate) {
                    setEndDate(newDate);
                    if (onDateChange) onDateChange(startDate, newDate);
                }
            }
        }
    };

    const renderDatePicker = (
        label: string,
        selectedDate: Date,
        type: "start" | "end",
        hasBorder: boolean
    ) => (
        <div
            className={`w-full flex items-end gap-2 sm:pr-2 ${hasBorder ? "sm:border-r-1" : ""
                }`}
        >
            <span className="text-lg">{label}</span>
            <DatePicker
                selected={selectedDate}
                onChange={(date) => handleDateChange(date, type)}
                dateFormat="dd/MM/yyyy"
                portalId="root-portal"
                minDate={type === "end" ? startDate : undefined}
                className="cursor-pointer"
                customInput={
                    <button className="flex items-center gap-2">
                        {selectedDate.toLocaleDateString()}
                        <IoCalendarOutline className="text-2xl -translate-y-1" />
                    </button>
                }
            />
        </div>
    );

    return (
        <div className="w-full max-w-[1400px] ml-8 flex justify-start mt-4 mb-8">
            <div className="w-fit mx-3 h-fit px-2.5 py-1.5 rounded-lg flex flex-col sm:flex-row items-center gap-2 border-1 z-50">
                {renderDatePicker("De:", startDate, "start", true)}
                {renderDatePicker("Até:", endDate, "end", false)}
            </div>
        </div>
    );
};