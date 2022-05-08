import { createContext, useContext, useState, useEffect } from "react";
import ApiCalendar from "react-google-calendar-api";
import { filterEvents } from "../utils";

const EventsContext = createContext();

const EventsProvider = ({ children }) => {
  const [events, setEvents] = useState([]);

  const fetchEvents = () => {
    ApiCalendar.onLoad(() => {
      ApiCalendar.listUpcomingEvents(10).then(({ result }) => {
        const filteredEvents = filterEvents(result.items);
        console.log(filteredEvents, "filteredEvents");
        setEvents(filteredEvents);
      });
    });
  };

  // timer.current = setInterval(() => {
  //   console.log("passcode is", passcode);
  //   const now = new Date().getTime();
  //   console.log(formattedTime, now);
  //   // if (now >= formattedTime && url.includes('zoom')) {
  //     clearInterval(timer.current);
  //     let newTab = window.open();
  //     newTab.location.href = url;
  //     // window.open(`${url}?pwd=${passcode}`, "_blank");
  //   // }
  // },
  //  1000)
  // }
  // }

  // return () => clearTimeout(timer.current);
  //   }, [events]);

  const value = { events, fetchEvents };

  return <EventsContext.Provider value={value}>{children}</EventsContext.Provider>;
};

const useEvents = () => useContext(EventsContext);

export { useEvents, EventsProvider };
