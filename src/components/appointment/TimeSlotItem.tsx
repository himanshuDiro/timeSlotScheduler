
import React from "react";
import { TimeSlot } from "@/types/appointment";

interface TimeSlotItemProps {
  slot: TimeSlot;
  isSelected: boolean;
  onSelect: (slot: TimeSlot) => void;
}

/**
 * Component that displays a single time slot
 */
const TimeSlotItem: React.FC<TimeSlotItemProps> = ({ slot, isSelected, onSelect }) => {
  return (
    <button
      onClick={() => onSelect(slot)}
      className={`py-3 px-4 rounded-md border transition-colors w-full text-center ${
        isSelected
          ? "bg-blue-600 text-white border-blue-600"
          : "bg-white hover:bg-gray-50 border-gray-200"
      }`}
      aria-pressed={isSelected}
      data-testid="time-slot-item"
    >
      <span className="font-medium block">{slot.displayTime}</span>
    </button>
  );
};

export default TimeSlotItem;
