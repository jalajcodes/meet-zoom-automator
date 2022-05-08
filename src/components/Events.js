import React, { useEffect } from "react";
import { useEvents } from "../contexts/eventsContext";

export default function Events() {
  const { events, fetchEvents } = useEvents();

  useEffect(() => {
    if (!events.length) {
      fetchEvents();
    }
  }, []);

  if (!events.length) {
    <div className="">No Events Found</div>;
  }

  return (
    <div class="flex justify-center">
      <ul class="bg-white rounded-lg border border-gray-200 text-gray-900">
        {events.map((event) => (
          <li key={event.id} class="px-6 py-2 border-b border-gray-200 w-full rounded-t-lg">
            {event.summary}
          </li>
        ))}
      </ul>
    </div>
  );
}
