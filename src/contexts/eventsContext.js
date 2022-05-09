import { createContext, useContext, useState } from "react";
import ApiCalendar from "react-google-calendar-api";
import { filterEvents } from "../utils";

const EventsContext = createContext();

const EventsProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [createEventResult, setCreateEventResult] = useState(null);

  const fetchEvents = () => {
    ApiCalendar.onLoad(() => {
      let timeMax = new Date();
      timeMax.setHours(24, 0, 0, 0);
      timeMax = timeMax.toISOString();

      ApiCalendar.listEvents({
        timeMin: new Date().toISOString(),
        timeMax,
        orderBy: "updated",
      })
        .then(({ result }) => {
          console.log(result);
          const filteredEvents = filterEvents(result.items);
          console.log(filteredEvents, "filteredEvents");
          setEvents(filteredEvents);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };

  const createEvent = (startTime, endTime, summary, description) => {
    var event = {
      summary: summary,
      description: description,
      start: {
        dateTime: new Date(startTime).toISOString(),
      },
      end: {
        dateTime: new Date(endTime).toISOString(),
      },
    };
    ApiCalendar.onLoad(() => {
      ApiCalendar.createEvent(event).then((result) => {
        setCreateEventResult(result);
      });
    });
  };

  const value = { events, fetchEvents, createEvent, createEventResult };

  return <EventsContext.Provider value={value}>{children}</EventsContext.Provider>;
};

const useEvents = () => useContext(EventsContext);

export { useEvents, EventsProvider };
