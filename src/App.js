import "tw-elements";
import "./App.css";
import Header from "./components/Header";
import Tabs from "./components/Tabs";
import { useAuth } from "./contexts/authContext";

function App() {
  const { isLoggedIn } = useAuth();

  // useEffect(() => {
  //   const timers = [];
  //   const _events = [];
  //   events.length > 0 &&
  //     events.map((event) => {
  //       const time = event.start.dateTime;
  //       const desc = event.description;
  //       let url = desc.match(/(?:(?:https?):\/\/|www\.)(?:\([-A-Z0-9+&@#/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#/%=~_|$?!:,.]*\)|[A-Z0-9+&@#/%=~_|$])/gim)[0];
  //       url += "/join";
  //       url = url.replace("/j/", "/wc/");
  //       const regex = /passcode: (.+?(&nbsp;))/gim;
  //       const code = regex.exec(desc);
  //       let passcode;
  //       if (code) {
  //         passcode = code[1].replace("&nbsp;", "");
  //       }
  //       console.log("passcode", passcode);
  //       if (!url.includes("pwd")) url = `${url}?pwd=${passcode}`;
  //       // openUrl(url);

  //       _events.push({ url: url, time });
  //     });
  //   let _newEvents = JSON.parse(localStorage.getItem("events"));
  //   if (!_newEvents) {
  //     _newEvents = [];
  //   }
  //   console.log(_newEvents, _events);
  //   // localStorage.setItem("events", JSON.stringify([..._newEvents, _events]));
  //   // console.log("url", url, "passcode");

  //   // timer.current = setInterval(() => {
  //   //   console.log("passcode is", passcode);
  //   //   const now = new Date().getTime();
  //   //   console.log(formattedTime, now);
  //   //   // if (now >= formattedTime && url.includes('zoom')) {
  //   //     clearInterval(timer.current);
  //   //     let newTab = window.open();
  //   //     newTab.location.href = url;
  //   //     // window.open(`${url}?pwd=${passcode}`, "_blank");
  //   //   // }
  //   // },
  //   //  1000)
  //   // }

  //   // return () => clearTimeout(timer.current);
  // }, [events]);

  return (
    <div className="App">
      <Header />
      {isLoggedIn && <Tabs />}
    </div>
  );
}

export default App;
