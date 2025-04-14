
import React, { useState, useEffect } from "react";
import TimeSlotScheduler from "@/components/appointment/TimeSlotScheduler";
import { TimeSlot, SelectedSlot } from "@/types/appointment";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

const TimeSlotSchedulerDemo = () => {
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [selectedAppointment, setSelectedAppointment] = useState<SelectedSlot | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch slots from the JSON file
    const fetchSlots = async () => {
      try {
        const response = await import("@/data/slots.json");
        setSlots(response.default);
        setLoading(false);
      } catch (error) {
        console.error("Failed to load slot data:", error);
        toast({
          title: "Error loading data",
          description: "There was a problem loading the appointment slots.",
          variant: "destructive",
        });
        setLoading(false);
      }
    };

    fetchSlots();
  }, []);

  const handleSlotSelect = (selected: SelectedSlot | null) => {
    setSelectedAppointment(selected);
    
    if (selected) {
      toast({
        title: "Appointment time selected",
        description: `${selected.date} at ${selected.slot.displayTime} - ${selected.slot.displayTimeEnd}`,
      });
    }
  };

  const handleConfirm = () => {
    if (selectedAppointment) {
      toast({
        title: "Appointment confirmed!",
        description: `Your appointment is scheduled for ${selectedAppointment.date} at ${selectedAppointment.slot.displayTime} - ${selectedAppointment.slot.displayTimeEnd}`,
      });
    } else {
      toast({
        title: "No appointment selected",
        description: "Please select a time slot first.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 flex justify-center">
      <Card className="w-full max-w-2xl"> {/* Increased max-width and centered */}
        <CardHeader>
          <CardTitle>Appointment Scheduler</CardTitle>
          <CardDescription>Select a time slot for your appointment</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">Loading available slots...</div>
          ) : (
            <>
              <TimeSlotScheduler slots={slots} onSlotSelect={handleSlotSelect} />
              
              {selectedAppointment && (
                <div className="mt-6">
                  <button
                    onClick={handleConfirm}
                    className="w-full bg-primary text-primary-foreground py-2 rounded-md font-medium"
                  >
                    Confirm Appointment
                  </button>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TimeSlotSchedulerDemo;
