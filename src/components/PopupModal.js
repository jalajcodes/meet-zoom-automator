import React from "react";

function PopupModal() {
  return (
    <div className="w-screen h-screen bg-black/[.8] absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center z-40">
      <div className="bg-white relative opacity-100 rounded-lg shadow-lg p-10 z-50 grid place-items-center">
        <h1 className="text-4xl font-bold text-slate-700 text-center">
          Unfortunately, your browser is blocking popups.
        </h1>
        <h2 className="text-2xl mt-2 text-slate-600 text-center">
          Please allow popups for this site and{" "}
          <span className="font-bold text-red-400">Refresh the Page</span>.
        </h2>

        <a
          href="https://support.google.com/chrome/answer/95472?hl=en&co=GENIE.Platform%3DDesktop"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5"
        >
          <img
            src="https://static.javatpoint.com/androidpages/images/how-to-allow-or-block-pop-ups-in-chrome-browser.png"
            alt="Enable popup"
          />
        </a>
      </div>
    </div>
  );
}

export default PopupModal;
