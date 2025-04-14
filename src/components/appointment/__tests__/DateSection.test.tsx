
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import DateSection from "../DateSection";
import { DateGroup, TimeSlot } from "@/types/appointment";
import "@testing-library/jest-dom";

describe("DateSection", () => {
  // Sample test data
  const mockSlots: TimeSlot[] = [
    {
      displayDate: "2024/08/02",
      displayTime: "07:30AM",
      displayTimeEnd: "08:00AM",
      startTimeUtc: 1722564000,
      endTimeUtc: 1722565800,
    }
  ];

  const mockDateGroup: DateGroup = {
    date: "2024/08/02",
    slots: mockSlots,
    dayOfMonth: "02",
    dayOfWeek: "Fri"
  };

  it("renders without crashing", () => {
    render(
      <DateSection
        dateGroup={mockDateGroup}
        selectedSlot={null}
        onSelectSlot={() => {}}
        isSelectedDate={false}
        onSelectDate={() => {}}
      />
    );
    expect(screen.getByTestId("date-section")).toBeInTheDocument();
  });

  it("displays the day of month and day of week correctly", () => {
    render(
      <DateSection
        dateGroup={mockDateGroup}
        selectedSlot={null}
        onSelectSlot={() => {}}
        isSelectedDate={false}
        onSelectDate={() => {}}
      />
    );
    expect(screen.getByText("02")).toBeInTheDocument();
    expect(screen.getByText("Fri")).toBeInTheDocument();
  });

  it("applies the correct styling when selected", () => {
    render(
      <DateSection
        dateGroup={mockDateGroup}
        selectedSlot={null}
        onSelectSlot={() => {}}
        isSelectedDate={true}
        onSelectDate={() => {}}
      />
    );
    
    const dateSection = screen.getByTestId("date-section");
    expect(dateSection).toHaveClass("bg-blue-50");
  });

  it("applies the correct styling when not selected", () => {
    render(
      <DateSection
        dateGroup={mockDateGroup}
        selectedSlot={null}
        onSelectSlot={() => {}}
        isSelectedDate={false}
        onSelectDate={() => {}}
      />
    );
    
    const dateSection = screen.getByTestId("date-section");
    expect(dateSection).toHaveClass("bg-white");
  });

  it("calls onSelectDate when clicked", () => {
    const mockOnSelectDate = jest.fn();
    render(
      <DateSection
        dateGroup={mockDateGroup}
        selectedSlot={null}
        onSelectSlot={() => {}}
        isSelectedDate={false}
        onSelectDate={mockOnSelectDate}
      />
    );
    
    fireEvent.click(screen.getByTestId("date-section"));
    expect(mockOnSelectDate).toHaveBeenCalled();
  });
});
