
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TimeSlotScheduler from "../TimeSlotScheduler";
import { TimeSlot } from "@/types/appointment";
import "@testing-library/jest-dom";

// Mock the toast hook
jest.mock("@/hooks/use-toast", () => ({
  toast: jest.fn(),
}));

describe("TimeSlotScheduler", () => {
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

  it("renders without crashing", () => {
    render(<TimeSlotScheduler slots={mockSlots} />);
    expect(screen.getByTestId("time-slot-scheduler")).toBeInTheDocument();
  });

  it("displays the correct heading", () => {
    render(<TimeSlotScheduler slots={mockSlots} />);
    expect(screen.getByText("Pick a date")).toBeInTheDocument();
  });

  it("allows navigation between dates using buttons", () => {
    render(<TimeSlotScheduler slots={mockSlots} />);
    
    // There should be navigation buttons
    const prevButton = screen.getByLabelText("Previous dates");
    const nextButton = screen.getByLabelText("Next dates");
    
    expect(prevButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
  });

  it("displays a message when no slots are available", () => {
    render(<TimeSlotScheduler slots={[]} />);
    expect(screen.getByText("No available time slots")).toBeInTheDocument();
  });
});
