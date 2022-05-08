import { useEffect, useState } from "react";
import ApiCalendar from "react-google-calendar-api";
import "./App.css";

function App() {
  const [events, setEvents] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState();
  useEffect(() => {
    if (localStorage?.getItem("isLoggedIn")) {
      setIsLoggedIn(localStorage?.getItem("isLoggedIn"));
    }
  }, []);
  const openUrl = (url) => {
    let newWin = window.open(url, "_blank");

    if (!newWin || newWin.closed || typeof newWin.closed == "undefined") {
      alert("Please enable popup");
    }
  };
  useEffect(() => {
    const timers = [];
    const _events = [];
    events.length > 0 &&
      events.map((event) => {
        const time = event.start.dateTime;
        const desc = event.description;
        let url = desc.match(
          /(?:(?:https?):\/\/|www\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/gim
        )[0];
        url += "/join";
        url = url.replace("/j/", "/wc/");
        const regex = /passcode: (.+?(&nbsp;))/gim;
        const code = regex.exec(desc);
        let passcode;
        if (code) {
          passcode = code[1].replace("&nbsp;", "");
        }
        console.log("passcode", passcode);
        if (!url.includes("pwd")) url = `${url}?pwd=${passcode}`;
        // openUrl(url);

        _events.push({ url: url, time });
      });
    let _newEvents = JSON.parse(localStorage.getItem("events"));
    if (!_newEvents) {
      _newEvents = [];
    }
    console.log(_newEvents, _events);
    // localStorage.setItem("events", JSON.stringify([..._newEvents, _events]));
    // console.log("url", url, "passcode");

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

    // return () => clearTimeout(timer.current);
  }, [events]);
  const fetchEvents = () => {
    ApiCalendar.onLoad(() => {
      ApiCalendar.listUpcomingEvents(10).then(({ result }) => {
        setEvents(
          result.items.filter((item) => {
            if (
              item?.description?.toLowerCase().includes("zoom") ||
              item?.description?.toLowerCase().includes("google meet")
            ) {
              return true;
            }
          })
        );
      });
    });
  };
  const handleClick = (evt, name) => {
    if (name === "sign-in") {
      localStorage?.getItem("events") !== undefined &&
        ApiCalendar.handleAuthClick()
          .then(() => {
            console.log("sign in succesful!");
            setIsLoggedIn(true);
            console.log(localStorage.getItem("events"));
            fetchEvents();
          })
          .catch((e) => {
            console.error(`sign in failed ${e}`);
          });
    } else if (name === "sign-out") {
      ApiCalendar.handleSignoutClick();
      setIsLoggedIn(false);
    }
  };
  useEffect(() => {
    if (isLoggedIn !== undefined) {
      localStorage.setItem("isLoggedIn", isLoggedIn);
    }
  }, [isLoggedIn]);
  console.log(isLoggedIn);
  return (
    <div className="App">
      <header className="App-header">
        {!isLoggedIn ? (
          <button onClick={(e) => handleClick(e, "sign-in")}> Login</button>
        ) : (
          <ul>
            <button onClick={(e) => handleClick(e, "sign-out")}>Logout</button>
            {events.map((event) => (
              <li key={event.id}>{event.summary}</li>
            ))}
          </ul>
        )}
      </header>
    </div>
  );
}

export default App;
