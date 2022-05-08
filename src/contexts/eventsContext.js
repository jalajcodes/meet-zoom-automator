import { createContext, useContext, useState } from "react";
import ApiCalendar from "react-google-calendar-api";

const EventsContext = createContext();

const EventsProvider = ({ children }) => {
  const [events, setEvents] = useState([]);

  const fetchEvents = () => {
    ApiCalendar.onLoad(() => {
      ApiCalendar.listUpcomingEvents(10).then(({ result }) => {
        console.log(result);
        setEvents(
          result.items.filter((item) => {
            if (item?.description?.toLowerCase().includes("zoom") || item?.description?.toLowerCase().includes("google meet")) {
              return true;
            }

            return false;
          })
        );
      });
    });
  };

  const value = { events, fetchEvents };

  return <EventsContext.Provider value={value}>{children}</EventsContext.Provider>;
};

const useEvents = () => useContext(EventsContext);

export { useEvents, EventsProvider };
