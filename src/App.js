import logo from './logo.svg';
import './App.css';
import GoogleLogin from './components/googleLogin';
import ApiCalendar from 'react-google-calendar-api';
import Pattern from 'url-knife';

import { useEffect, useRef, useState } from 'react';

function App() {
  const [events, setEvents] = useState([]);
  const timer = useRef();
  const btnRef = useRef();

  const onGoogleSignIn = (googleUser) => {
    console.log(googleUser);
  }

  useEffect(() => {
    if (events.length > 0) {
      const time = events[0].start.dateTime;
      const formattedTime = new Date(time).getTime();
      const desc = events[0].description;
      const url = desc.match(/(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/igm)[0];
      const regex = /passcode: ([0-9]*)/igm
      const code = regex.exec(desc);
      let passcode;
      if (code) {
        passcode = code[1];
      }

      console.log("url", url, "passcode");

      timer.current = setInterval(() => {
        console.log("passcode is", passcode);
        const now = new Date().getTime();
        console.log(formattedTime, now);
        // if (now >= formattedTime && url.includes('zoom')) {
          clearInterval(timer.current);
          let newTab = window.open(); 
          newTab.location.href = url;
          // window.open(`${url}?pwd=${passcode}`, "_blank");
        // }
      }, 1000)
    }

    return () => clearTimeout(timer.current);
  }, [events])

  const handleClick = (evt, name) => {
    if (name === 'sign-in') {
      ApiCalendar.handleAuthClick()
      .then(() => {
        console.log('sign in succesful!');
        ApiCalendar.listUpcomingEvents(10).then(({ result }) => {
          console.log(result.items);
          setEvents(result.items);

        });
      })
      .catch((e) => {
        console.error(`sign in failed ${e}`);
      })
    } else if (name === 'sign-out') {
      ApiCalendar.handleSignoutClick();
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={(e) => handleClick(e, 'sign-in')}> Login</button>
        {/* <GoogleLogin onGoogleSignIn={onGoogleSignIn} /> */}

        <button ref={btnRef}>Test Button</button>
      </header>
    </div>
  );
}

export default App;
