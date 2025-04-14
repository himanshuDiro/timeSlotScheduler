
/**
 * Interface for a single appointment time slot
 */
export interface TimeSlot {
  displayDate: string;
  displayTime: string;
  displayTimeEnd: string;
  startTimeUtc: number;
  endTimeUtc: number;
}

/**
 * Interface for a group of time slots on the same date
 */
export interface DateGroup {
  date: string;
  slots: TimeSlot[];
  dayOfMonth: string;
  dayOfWeek: string;
}

/**
 * Interface for the selected time slot
 */
export interface SelectedSlot {
  date: string;
  slot: TimeSlot;
}
