import { createContext, useContext } from "react";
import PopupModal from "../components/PopupModal";
import { isPopupBlocked } from "../utils";

const ModalContext = createContext();

const ModalProvider = ({ children }) => {
  const popupBlocked = isPopupBlocked();

  return (
    <ModalContext.Provider value={{}}>
      {children}
      {popupBlocked && <PopupModal />}
    </ModalContext.Provider>
  );
};

const useModal = () => useContext(ModalContext);

export { useModal, ModalProvider };
