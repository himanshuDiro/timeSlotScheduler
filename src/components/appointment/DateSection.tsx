
import React from "react";
import { DateGroup, TimeSlot } from "@/types/appointment";

interface DateSectionProps {
  dateGroup: DateGroup;
  selectedSlot: TimeSlot | null;
  onSelectSlot: (slot: TimeSlot) => void;
  isSelectedDate: boolean;
  onSelectDate: () => void;
}

/**
 * Component that displays a date card
 */
const DateSection: React.FC<DateSectionProps> = ({
  dateGroup,
  selectedSlot,
  onSelectSlot,
  isSelectedDate,
  onSelectDate,
}) => {
  const { dayOfMonth, dayOfWeek } = dateGroup;
  
  return (
    <div 
      onClick={onSelectDate}
      className={`flex flex-col items-center justify-center p-6 rounded-md cursor-pointer transition-colors min-w-[90px] ${
        isSelectedDate ? "bg-blue-50 border border-blue-100" : "bg-white border border-gray-200"
      }`}
      data-testid="date-section"
    >
      <div className="text-3xl font-bold">{dayOfMonth}</div>
      <div className="text-md text-gray-500">{dayOfWeek}</div>
    </div>
  );
};

export default DateSection;
