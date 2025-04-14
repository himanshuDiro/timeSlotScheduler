
import { DateGroup, TimeSlot } from "@/types/appointment";
import { format, parse } from "date-fns";

/**
 * Formats a date string from "YYYY/MM/DD" to a more readable format
 * @param dateStr Date string in format "YYYY/MM/DD"
 * @returns Formatted date string
 */
export const formatDisplayDate = (dateStr: string): string => {
  const date = parse(dateStr, "yyyy/MM/dd", new Date());
  return format(date, "EEE, MMM d, yyyy");
};

/**
 * Groups time slots by date
 * @param slots Array of time slots
 * @returns Array of date groups, each containing slots for that date
 */
export const groupSlotsByDate = (slots: TimeSlot[]): DateGroup[] => {
  const groupedByDate: Record<string, TimeSlot[]> = {};

  // Group slots by their display date
  slots.forEach((slot) => {
    if (!groupedByDate[slot.displayDate]) {
      groupedByDate[slot.displayDate] = [];
    }
    groupedByDate[slot.displayDate].push(slot);
  });

  // Convert grouped object to array of DateGroup objects
  return Object.entries(groupedByDate).map(([date, slots]) => {
    const parsedDate = parse(date, "yyyy/MM/dd", new Date());
    return {
      date,
      slots,
      dayOfMonth: format(parsedDate, "dd"),
      dayOfWeek: format(parsedDate, "EEE"),
    };
  });
};

/**
 * Formats a time slot to display the time range
 * @param slot Time slot object
 * @returns Formatted time range string (e.g., "07:30AM - 08:00AM")
 */
export const formatTimeRange = (slot: TimeSlot): string => {
  return `${slot.displayTime} - ${slot.displayTimeEnd}`;
};
