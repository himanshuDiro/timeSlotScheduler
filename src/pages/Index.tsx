
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="text-center max-w-lg">
        <h1 className="text-4xl font-bold mb-4">Time Slot Scheduler</h1>
        <p className="text-xl text-gray-600 mb-8">
          A React component for scheduling appointments with selectable time slots
        </p>
        
        <Link to="/appointment-scheduler">
          <Button className="gap-2">
            <Calendar className="h-5 w-5" />
            View Appointment Scheduler
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Index;
