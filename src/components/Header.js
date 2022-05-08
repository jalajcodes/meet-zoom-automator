import React from "react";
import { useAuth } from "../contexts/authContext";

function Header() {
  const { isLoggedIn, handleLogin, handleLogout, userProfile } = useAuth();
  return (
    <header>
      <nav className="navbar navbar-expand-lg shadow-md py-2 bg-white">
        <div className="px-10 py-2  w-full flex  items-center">
          <div className=" grow items-center" id="navbarSupportedContentY">
            <div className="flex justify-between items-center w-full cursor-pointer">
              <ul className="navbar-nav mr-auto lg:flex lg:flex-row">
                <li className="nav-item">
                  <a
                    className="nav-link   tex-4xl flex font-bold items-center pr-2 lg:px-2 py-2 text-gray-600 hover:text-gray-700 focus:text-gray-700 transition duration-150 ease-in-out"
                    href="#!"
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="light"
                  >
                    <img src="./logo.png" alt="ZooMeet" />
                    <span className="ml-3">ZooMeet</span>
                  </a>
                </li>
              </ul>

              <ul>
                {isLoggedIn ? (
                  <>
                    <img
                      id="dropdownMenuButton2"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      src="https://www.shareicon.net/data/512x512/2016/09/01/822711_user_512x512.png"
                      className="w-12 overflow-hidden h-12 rounded-full aspect-square border-2 border-violet-400 shadow-sm"
                      alt={userProfile.name}
                    />

                    <ul
                      className="dropdown-menu right-5  min-w-max absolute  text-base z-50 float-left py-2 list-none text-left rounded-lg shadow-lg mt-1 hidden m-0 bg-clip-padding border-none bg-slate-800"
                      aria-labelledby="dropdownMenuButton2"
                    >
                      <li>
                        <a
                          className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-300 hover:bg-gray-700 hover:text-white focus:text-white focus:bg-gray-700 active:bg-violet-600"
                          href="#"
                        >
                          Profile
                        </a>
                      </li>

                      <li>
                        <hr className="h-0 my-2 border border-solid border-t-0 border-gray-300 opacity-25" />
                      </li>
                      <li
                        className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-300 hover:bg-gray-700 hover:text-white focus:text-white focus:bg-gray-700"
                        onClick={handleLogout}
                      >
                        Logout
                      </li>
                    </ul>
                  </>
                ) : (
                  <li onClick={handleLogin} className="px-4 py-1.5 text-white rounded-full bg-slate-700">
                    Login
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <div
        className={`relative  overflow-hidden bg-no-repeat bg-cover ${isLoggedIn ? "h-40" : "h-screen"}`}
        style={{
          backgroundPosition: "50%",
          backgroundImage: 'url("https://mdbcdn.b-cdn.net/img/new/slides/146.webp")',
        }}
      >
        <div className="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed" style={{ backgroundColor: "rgba(0, 0, 0, 0.75)" }}>
          <div className="flex justify-center items-center h-full">
            <div className="text-center text-white px-6 md:px-12">
              <h1 className="text-5xl font-bold mt-0 mb-6">Hello, {userProfile?.name ? userProfile.name : "Guest"}</h1>
              {!isLoggedIn && <h6 className="text-3xl font-bold mb-8">Please Login to Get Started</h6>}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
