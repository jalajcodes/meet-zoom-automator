import React, { useEffect, useState } from "react";
import { useEvents } from "../contexts/eventsContext";
import { useAudio } from "../hooks/useAudio";
import { formatTimeFromNow } from "../utils";

export default function Events() {
  const [scheduledTimers, setScheduledTimers] = useState(JSON.parse(localStorage.getItem("scheduledTimers")) || []);
  const { events, fetchEvents } = useEvents();
  const audio = useAudio("/assets/alarm.wav", { volume: 0.8, playbackRate: 1.5 });

  useEffect(() => {
    if (!events.length) {
      fetchEvents();
    }
  }, []);

  useEffect(() => {
    if (scheduledTimers.length) {
      scheduledTimers.forEach((timer) => {
        handleTimer(timer);
      });
    }
  }, []);

  const handleTimer = (calendarEvent) => {
    const alarmTime = new Date(calendarEvent.time).getTime();
    const now = new Date().getTime();
    const timeDiff = alarmTime - now;

    console.log(timeDiff, "timeDiff");

    // start alarm 20 seconds before timeDiff
    const alarmTimer = setTimeout(() => {
      audio.play();
    }, timeDiff - 20000);

    const timer = setTimeout(() => {
      console.log("alarm is playing");
      audio.pause();
      window.open(calendarEvent.url, "_blank");

      clearTimeout(alarmTimer);
      clearTimeout(timer);

      const newScheduledTimers = scheduledTimers.filter((_timer) => _timer.id !== calendarEvent.id);
      setScheduledTimers(newScheduledTimers);
      localStorage.setItem("scheduledTimers", JSON.stringify(newScheduledTimers));
    }, timeDiff);

    return { timer, alarmTimer };
  };

  const startAlarm = (calendarEvent) => {
    const { timer, alarmTimer } = handleTimer(calendarEvent);

    const newTimer = {
      timer,
      alarmTimer,
      ...calendarEvent,
    };

    const newScheduledTimers = [...scheduledTimers, newTimer];

    setScheduledTimers(newScheduledTimers);
    localStorage.setItem("scheduledTimers", JSON.stringify(newScheduledTimers));

    return () => {
      clearTimeout(alarmTimer);
    };
  };

  const stopAlarm = (id) => {
    const timerToStop = scheduledTimers.find((timer) => timer.id === id);
    console.log("🚀 ~ file: Events.js ~ line 74 ~ stopAlarm ~ timerToStop", timerToStop);
    clearTimeout(timerToStop.timer);
    clearTimeout(timerToStop.alarmTimer);

    const newScheduledTimers = scheduledTimers.filter((timer) => timer.id !== id);
    setScheduledTimers(newScheduledTimers);
    localStorage.setItem("scheduledTimers", JSON.stringify(newScheduledTimers));
  };

  const timerAlreadyStarted = (id) => {
    return scheduledTimers.find((timer) => timer.id === id);
  };

  if (!events.length) {
    return <div className="">No Upcoming Events Found</div>;
  }

  return (
    <div className="flex p-5">
      <ul className=" text-left text-gray-900 flex gap-3 flex-wrap">
        {events.map((event) => (
          <React.Fragment key={event.id}>
            <li className="px-5 shadow-md border-2 py-4 border-slate-300 bg-slate-200  rounded-lg gap-2 flex flex-col w-fit">
              <div className="flex flex-col gap-1">
                <div>
                  <strong>Event Name:</strong> {event.summary}
                </div>

                {event.url && (
                  <div>
                    <strong>Link:</strong>
                    <a href={event.url} target="_blank" rel="noreferrer">
                      {event.url}
                    </a>
                  </div>
                )}

                {event.time && (
                  <div>
                    <strong>Start Time:</strong> {formatTimeFromNow(event.time)}
                  </div>
                )}
              </div>
              <div>
                <div className="flex space-x-2 w-full self-stretch">
                  {timerAlreadyStarted(event.id) ? (
                    <button
                      type="button"
                      data-mdb-ripple="true"
                      data-mdb-ripple-color="light"
                      onClick={() => stopAlarm(event.id)}
                      className="inline-block px-6 mt-2 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
                    >
                      Stop Alarm
                    </button>
                  ) : (
                    <button
                      type="button"
                      data-mdb-ripple="true"
                      data-mdb-ripple-color="light"
                      onClick={() => startAlarm(event)}
                      className="inline-block px-6 mt-2 py-2.5 bg-violet-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-violet-700 hover:shadow-lg focus:bg-violet-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-violet-800 active:shadow-lg transition duration-150 ease-in-out"
                    >
                      Start Alarm
                    </button>
                  )}
                </div>
              </div>
            </li>
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
}
