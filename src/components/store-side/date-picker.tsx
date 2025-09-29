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

    const handleStartDateChange = (date: Date | null) => {
        if (date) {
            const newDate = new Date(date);
            newDate.setHours(0, 0, 0, 0); 
            setStartDate(newDate);
            if (onDateChange) onDateChange(newDate, endDate);
        }
    };

    const handleEndDateChange = (date: Date | null) => {
        if (date) {
            const newDate = new Date(date);
            newDate.setHours(23, 59, 59, 999);
            setEndDate(newDate);
            if (onDateChange) onDateChange(startDate, newDate);
        }
    };

    return (
        <div className="px-2.5 py-1.5 rounded-lg flex flex-col sm:flex-row items-center gap-2 border-1">
            <div className="w-full flex items-end justify-between gap-2 sm:pr-3 sm:border-r-1">
                <span className="text-lg">De:</span>
                <DatePicker
                    selected={startDate}
                    onChange={handleStartDateChange}
                    dateFormat="dd/MM/yyyy"
                    portalId="root-portal"
                    className="cursor-pointer"
                    customInput={
                        <button className="flex items-center gap-2">
                            {startDate.toLocaleDateString()}
                            <IoCalendarOutline className="text-2xl -translate-y-1" />
                        </button>
                    }
                />
            </div>
            <div className="w-full flex items-end gap-2">
                <span className="text-lg">Até:</span>
                <DatePicker
                    selected={endDate}
                    onChange={handleEndDateChange}
                    dateFormat="dd/MM/yyyy"
                    portalId="root-portal"
                    className="cursor-pointer"
                    customInput={
                        <button className="flex items-center gap-2">
                            {endDate.toLocaleDateString()}
                            <IoCalendarOutline className="text-2xl -translate-y-1" />
                        </button>
                    }
                />
            </div>
        </div>
    );
};