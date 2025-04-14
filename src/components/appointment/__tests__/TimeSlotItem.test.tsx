
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TimeSlotItem from "../TimeSlotItem";
import { TimeSlot } from "@/types/appointment";
import "@testing-library/jest-dom";

describe("TimeSlotItem", () => {
  // Sample test data
  const mockSlot: TimeSlot = {
    displayDate: "2024/08/02",
    displayTime: "07:30AM",
    displayTimeEnd: "08:00AM",
    startTimeUtc: 1722564000,
    endTimeUtc: 1722565800,
  };

  it("renders without crashing", () => {
    render(
      <TimeSlotItem slot={mockSlot} isSelected={false} onSelect={() => {}} />
    );
    expect(screen.getByTestId("time-slot-item")).toBeInTheDocument();
  });

  it("displays the time correctly", () => {
    render(
      <TimeSlotItem slot={mockSlot} isSelected={false} onSelect={() => {}} />
    );
    expect(screen.getByText("07:30AM")).toBeInTheDocument();
  });

  it("applies the correct styling when selected", () => {
    render(
      <TimeSlotItem slot={mockSlot} isSelected={true} onSelect={() => {}} />
    );
    
    const button = screen.getByTestId("time-slot-item");
    expect(button).toHaveClass("bg-blue-600");
    expect(button).toHaveClass("text-white");
    expect(button).toHaveAttribute("aria-pressed", "true");
  });

  it("applies the correct styling when not selected", () => {
    render(
      <TimeSlotItem slot={mockSlot} isSelected={false} onSelect={() => {}} />
    );
    
    const button = screen.getByTestId("time-slot-item");
    expect(button).toHaveClass("bg-white");
    expect(button).toHaveClass("hover:bg-gray-50");
    expect(button).toHaveAttribute("aria-pressed", "false");
  });

  it("calls onSelect when clicked", () => {
    const mockOnSelect = jest.fn();
    render(
      <TimeSlotItem slot={mockSlot} isSelected={false} onSelect={mockOnSelect} />
    );
    
    fireEvent.click(screen.getByTestId("time-slot-item"));
    expect(mockOnSelect).toHaveBeenCalledWith(mockSlot);
  });
});
