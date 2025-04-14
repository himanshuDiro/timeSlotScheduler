
import React, { useState, useEffect } from "react";
import { groupSlotsByDate } from "@/utils/slotUtils";
import { DateGroup, SelectedSlot, TimeSlot } from "@/types/appointment";
import DateSection from "./DateSection";
import TimeSlotsSection from "./TimeSlotsSection";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { format, parse } from "date-fns";

interface TimeSlotSchedulerProps {
  slots: TimeSlot[];
  onSlotSelect?: (selected: SelectedSlot | null) => void;
}

/**
 * Main component that displays the time slot scheduler
 * Handles navigation between dates and selection of time slots
 */
const TimeSlotScheduler: React.FC<TimeSlotSchedulerProps> = ({
  slots,
  onSlotSelect,
}) => {
  // Group slots by date
  const [dateGroups, setDateGroups] = useState<DateGroup[]>([]);
  // Track the selected date index
  const [selectedDateIndex, setSelectedDateIndex] = useState(0);
  // Track the selected time slot
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  // Current displayed date range
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: 5 });
  
  // Group slots by date when component mounts or slots change
  useEffect(() => {
    const grouped = groupSlotsByDate(slots);
    // Add day of month and day of week to each group
    const enhancedGroups = grouped.map(group => {
      const date = parse(group.date, "yyyy/MM/dd", new Date());
      return {
        ...group,
        dayOfMonth: format(date, "dd"),
        dayOfWeek: format(date, "EEE"),
      };
    });
    setDateGroups(enhancedGroups);
  }, [slots]);

  // Handle navigation to previous date range
  const handlePrevPage = () => {
    if (visibleRange.start > 0) {
      setVisibleRange({
        start: Math.max(0, visibleRange.start - 5),
        end: Math.max(5, visibleRange.end - 5)
      });
    } else {
      toast({
        title: "No more previous dates",
        description: "You've reached the first available date.",
      });
    }
  };

  // Handle navigation to next date range
  const handleNextPage = () => {
    if (visibleRange.end < dateGroups.length) {
      setVisibleRange({
        start: visibleRange.start + 5,
        end: Math.min(dateGroups.length, visibleRange.end + 5)
      });
    } else {
      toast({
        title: "No more next dates",
        description: "You've reached the last available date.",
      });
    }
  };

  // Handle selection of a date
  const handleSelectDate = (index: number) => {
    setSelectedDateIndex(index);
    setSelectedSlot(null);
    
    if (onSlotSelect) {
      onSlotSelect(null);
    }
  };

  // Handle selection of a time slot
  const handleSelectSlot = (slot: TimeSlot) => {
    const newSelectedSlot = selectedSlot?.startTimeUtc === slot.startTimeUtc ? null : slot;
    setSelectedSlot(newSelectedSlot);
    
    if (onSlotSelect) {
      onSlotSelect(
        newSelectedSlot 
          ? { date: dateGroups[selectedDateIndex].date, slot: newSelectedSlot } 
          : null
      );
    }
  };

  const visibleDates = dateGroups.slice(visibleRange.start, visibleRange.end);
  const selectedDateSlots = selectedDateIndex < dateGroups.length ? dateGroups[selectedDateIndex].slots : [];

  return (
    <div className="w-full mx-auto bg-[#f9f7f4] rounded-lg p-6 md:p-8" data-testid="time-slot-scheduler">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Pick a date</h2>
      
      {/* Date navigation and selection */}
      <div className="flex items-center justify-between mb-6 relative">
        <button
          onClick={handlePrevPage}
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 flex-shrink-0 absolute left-0 z-10"
          aria-label="Previous dates"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        
        <div className="flex space-x-3 overflow-x-auto py-2 px-10 w-full justify-center">
          {visibleDates.map((dateGroup, index) => (
            <DateSection
              key={dateGroup.date}
              dateGroup={dateGroup}
              selectedSlot={selectedSlot}
              onSelectSlot={handleSelectSlot}
              isSelectedDate={selectedDateIndex === index + visibleRange.start}
              onSelectDate={() => handleSelectDate(index + visibleRange.start)}
            />
          ))}
        </div>
        
        <button
          onClick={handleNextPage}
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 flex-shrink-0 absolute right-0 z-10"
          aria-label="Next dates"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
      
      {/* Time slots section */}
      {dateGroups.length > 0 ? (
        <TimeSlotsSection
          slots={selectedDateSlots}
          selectedSlot={selectedSlot}
          onSelectSlot={handleSelectSlot}
        />
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          No available time slots
        </div>
      )}
    </div>
  );
};

export default TimeSlotScheduler;
