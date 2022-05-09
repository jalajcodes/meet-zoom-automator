import React, { useEffect, useState } from "react";
import { useEvents } from "../contexts/eventsContext";

const CreateEvent = () => {
  const { createEvent, createEventResult, fetchEvents } = useEvents();
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [summary, setSummary] = useState();
  const [description, setDescription] = useState();

  useEffect(() => {
    if (createEventResult && createEventResult.status === 200) {
      fetchEvents();

      document.getElementById("tabs-home-tabJustify").click();
    }
  }, [createEventResult]);

  return (
    <div className="block p-6 rounded-lg shadow-lg bg-white md:w-max w-min  mx-auto text-left">
      <form
        onSubmit={async (e) => {
          e.preventDefault();

          try {
             await createEvent(startTime, endTime, summary, description);
          } catch (error) {
          console.log("🚀 ~ file: CreateEvent.jsx ~ line 21 ~ CreateEvent ~ error", error)
          }
        }}
      >
        <div className="flex items-end gap-2 flex-wrap">
          <div className="form-group mb-6 ">
            <label className="form-input-label mb-2 inline-block  text-gray-800" htmlFor="exampleInput9">
              Event title
            </label>
            <input
              type="text"
              className="form-control block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-violet-600 focus:outline-none"
              id="exampleInput7"
              placeholder="Event title"
              onChange={(e) => setSummary(e.target.value)}
            />
          </div>
          <div className="form-group mb-6">
            <label className="form-input-label  mb-2 inline-block text-gray-800" htmlFor="exampleInput8">
              Event start time
            </label>
            <input
              type="datetime-local"
              className="form-control block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-violet-600 focus:outline-none"
              id="exampleInput8"
              placeholder=""
              onChange={(e) => setStartTime(e.target.value)}
            />
          </div>
          <div className="form-group mb-6">
            <label className="form-input-label mb-2 inline-block  text-gray-800" htmlFor="exampleInput9">
              Event end time
            </label>
            <input
              type="datetime-local"
              className="form-control block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-violet-600 focus:outline-none"
              id="exampleInput9"
              placeholder=""
              onChange={(e) => setEndTime(e.target.value)}
            />
          </div>
        </div>
        <div className="form-group mb-6">
          <textarea
            className="
        form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-violet-600 focus:outline-none
      "
            id="exampleFormControlTextarea13"
            rows={3}
            placeholder="Event description"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="
      w-full
      px-6
      py-2.5
      bg-violet-600
      text-white
      font-medium
      text-xs
      leading-tight
      uppercase
      rounded
      shadow-md
      hover:bg-violet-700 hover:shadow-lg
      focus:bg-violet-700 focus:shadow-lg focus:outline-none focus:ring-0
      active:bg-violet-800 active:shadow-lg
      transition
      duration-150
      ease-in-out"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;
