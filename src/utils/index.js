export const isPopupBlocked = (url) => {
  if (!JSON.parse(localStorage.getItem("popupBlocked"))) {
    const newWin = window.open(url, "_blank");

    if (!newWin || newWin.closed || typeof newWin.closed == "undefined") {
      return true;
    } else {
      localStorage.setItem("popupBlocked", false);
      newWin.close();
      return false;
    }
  }
};
export function isCookieEnabled() {
  let cookieEnabled = navigator.cookieEnabled;
  if (!cookieEnabled) {
    document.cookie = "testcookie";
    cookieEnabled = document.cookie.indexOf("testcookie") != -1;
  }
  return cookieEnabled;
}

// map over the events and creating a new array with the url and time values
export const filterEvents = (events) => {
  const modifiedEvents = events.map((event) => {
    const time = event.start.dateTime;
    const desc = event.description;
    let url;

    if (event.hangoutLink) {
      url = event.hangoutLink;
    } else {
      let urlArray =
        desc && desc.match(/(?:(?:https?):\/\/|www\.)(?:\([-A-Z0-9+&@#/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#/%=~_|$?!:,.]*\)|[A-Z0-9+&@#/%=~_|$])/gim);

      url = urlArray && urlArray.find((url) => url.includes("zoom") || url.includes("meet"));

      if (url) {
        if (url.includes("zoom")) {
          url += "/join";
          url = url.replace("/j/", "/wc/");
          const regex = /passcode: (.+?(&nbsp;))/gim;
          const code = regex.exec(desc);
          let passcode;
          if (code) {
            passcode = code[1].replace("&nbsp;", "");
          }
          if (!url.includes("pwd") && passcode) url = `${url}?pwd=${passcode}`;
        }
      }
    }

    const result = { ...event, time };

    if (url) result.url = url;

    return result;
  });

  const filteredEvents = modifiedEvents.filter((event) => {
    if (event?.description?.toLowerCase().includes("zoom.us") || event?.description?.toLowerCase().includes("meet.google") || event?.hangoutLink) {
      return true;
    }

    return false;
  });

  return filteredEvents;
};

export const formatTimeFromNow = (time) => {
  const now = new Date();
  const eventTime = new Date(time);
  const diff = eventTime - now;
  const diffInMinutes = Math.round(diff / 60000);
  const diffInHours = Math.round(diff / 3600000);
  const diffInDays = Math.round(diff / 86400000);

  if (diffInMinutes < 1) {
    return "now";
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} minutes from now`;
  } else if (diffInHours < 24) {
    return `${diffInHours} hours from now`;
  } else if (diffInDays < 7) {
    return `${diffInDays} days from now`;
  }
};
