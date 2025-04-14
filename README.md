# Time Slot Scheduler React Component

A responsive React component for displaying available time slots for appointments.

## Features

- Display a list of dates and corresponding time slots
- Navigate through available dates
- Select a time slot for an appointment
- Responsive design for mobile and desktop
- Visual feedback for selected time slots
- Comprehensive unit tests for components

## Setup Instructions

To set up and run the project locally, follow these steps:

### Prerequisites

- Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

### Installation

```sh
# Step 1: Clone the repository
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory
cd time-slot-scheduler-react

# Step 3: Install the necessary dependencies
npm i

# Step 4: Start the development server
npm run dev
```

The application will be available at http://localhost:8080.

## Component Usage

You can use the TimeSlotScheduler component in your own project as follows:

```jsx
import TimeSlotScheduler from "./components/appointment/TimeSlotScheduler";
import { TimeSlot, SelectedSlot } from "./types/appointment";

const YourComponent = () => {
  // Your time slots data
  const slots = [
    {
      displayDate: "2024/08/02",
      displayTime: "07:30AM",
      displayTimeEnd: "08:00AM",
      startTimeUtc: 1722564000,
      endTimeUtc: 1722565800,
    },
    // More slots...
  ];

  const handleSlotSelect = (selected: SelectedSlot | null) => {
    if (selected) {
      console.log(`Selected slot: ${selected.date} at ${selected.slot.displayTime}`);
    } else {
      console.log("No slot selected");
    }
  };

  return <TimeSlotScheduler slots={slots} onSlotSelect={handleSlotSelect} />;
};
```

## Running Tests

To run the unit tests:

```sh
npm test
```

## Project Structure

- `/src/components/appointment` - Contains the main appointment scheduling components
- `/src/types` - TypeScript interfaces for the project
- `/src/utils` - Utility functions
- `/src/data` - JSON data for available time slots
- `/src/__tests__` - Unit tests for components and utilities

## License

This project is licensed under the MIT License - see the LICENSE file for details.
