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
