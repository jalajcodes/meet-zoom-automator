import { createContext, useContext } from "react";
import PopupModal from "../components/PopupModal";
import { isCookieEnabled, isPopupBlocked } from "../utils";

const ModalContext = createContext();

const ModalProvider = ({ children }) => {
  const cookieEnabled = isCookieEnabled();
  let popUpModal;
  if (!cookieEnabled) {
    popUpModal = <PopupModal isCookieDisabled={true} />;
  } else {
    const popupBlocked = isPopupBlocked();
    if (popupBlocked) {
      popUpModal = <PopupModal isPopupBlocked={popupBlocked} isCookieDisabled={true} />;
    }
  }
  return (
    <ModalContext.Provider value={{}}>
      {popUpModal}
      {children}
    </ModalContext.Provider>
  );
};

const useModal = () => useContext(ModalContext);

export { useModal, ModalProvider };
