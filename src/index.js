import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./contexts/authContext";
import { EventsProvider } from "./contexts/eventsContext";
import { ModalProvider } from "./contexts/modalContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ModalProvider>
    <AuthProvider>
      <EventsProvider>
        <App />
      </EventsProvider>
    </AuthProvider>
  </ModalProvider>
);
