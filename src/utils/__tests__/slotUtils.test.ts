
import { formatDisplayDate, groupSlotsByDate, formatTimeRange } from "../slotUtils";
import { TimeSlot } from "@/types/appointment";

describe("slotUtils", () => {
  // Sample test data
  const mockSlots: TimeSlot[] = [
    {
      displayDate: "2024/08/02",
      displayTime: "07:30AM",
      displayTimeEnd: "08:00AM",
      startTimeUtc: 1722564000,
      endTimeUtc: 1722565800,
    },
    {
      displayDate: "2024/08/02",
      displayTime: "08:00AM",
      displayTimeEnd: "08:30AM",
      startTimeUtc: 1722565800,
      endTimeUtc: 1722567600,
    },
    {
      displayDate: "2024/08/05",
      displayTime: "07:30AM",
      displayTimeEnd: "08:00AM",
      startTimeUtc: 1722823200,
      endTimeUtc: 1722825000,
    },
  ];

  describe("formatDisplayDate", () => {
    it("formats a date string correctly", () => {
      expect(formatDisplayDate("2024/08/02")).toBe("Fri, Aug 2, 2024");
      expect(formatDisplayDate("2024/08/05")).toBe("Mon, Aug 5, 2024");
      expect(formatDisplayDate("2024/12/25")).toBe("Wed, Dec 25, 2024");
    });
  });

  describe("groupSlotsByDate", () => {
    it("groups slots by date correctly", () => {
      const groupedSlots = groupSlotsByDate(mockSlots);
      
      expect(groupedSlots).toHaveLength(2);
      
      expect(groupedSlots[0].date).toBe("2024/08/02");
      expect(groupedSlots[0].slots).toHaveLength(2);
      
      expect(groupedSlots[1].date).toBe("2024/08/05");
      expect(groupedSlots[1].slots).toHaveLength(1);
    });

    it("returns an empty array when no slots are provided", () => {
      const emptyGroupedSlots = groupSlotsByDate([]);
      expect(emptyGroupedSlots).toHaveLength(0);
    });
  });

  describe("formatTimeRange", () => {
    it("formats a time range correctly", () => {
      expect(formatTimeRange(mockSlots[0])).toBe("07:30AM - 08:00AM");
      expect(formatTimeRange(mockSlots[1])).toBe("08:00AM - 08:30AM");
    });
  });
});
