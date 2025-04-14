
import React from "react";
import { TimeSlot } from "@/types/appointment";
import TimeSlotItem from "./TimeSlotItem";

interface TimeSlotsSectionProps {
  slots: TimeSlot[];
  selectedSlot: TimeSlot | null;
  onSelectSlot: (slot: TimeSlot) => void;
}

/**
 * Component that displays all time slots for a selected date
 */
const TimeSlotsSection: React.FC<TimeSlotsSectionProps> = ({
  slots,
  selectedSlot,
  onSelectSlot,
}) => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-1">Available time slots</h2>
      <p className="text-gray-400 text-sm mb-6">Each session lasts for 30 minutes</p>
      
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {slots.map((slot) => (
          <TimeSlotItem
            key={`${slot.displayDate}-${slot.displayTime}`}
            slot={slot}
            isSelected={
              selectedSlot?.startTimeUtc === slot.startTimeUtc &&
              selectedSlot?.endTimeUtc === slot.endTimeUtc
            }
            onSelect={onSelectSlot}
          />
        ))}
      </div>
    </div>
  );
};

export default TimeSlotsSection;
