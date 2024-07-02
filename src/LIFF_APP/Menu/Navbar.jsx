import { useLocation, useParams } from "react-router-dom";
import { useState } from "react";
import config from "../../config.json";

function Navbar() {
  const URL = config.URL_BASE;
  const navigationHistory = [];
  const location = useLocation();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const params = useParams();
  const postId = params.pid;

  const addToNavigationHistory = () => {
    navigationHistory.push(window.location.href);
  };

  // Function to get the title of the navbar based on the current page
  const getNavbarTitle = () => {
    switch (location.pathname) {
      case "/home":
        return "หน้าหลัก";
      case "/profile":
        return "โปรไฟล์";
      case "/list":
        return "รายการของฉัน";
      case "/form":
        return "ฟอร์มสำหรับแจ้งเหตุ";
      case "/lostitem":
        return "รายการของหายทั้งหมด";
      case "/finditem":
        return "รายการของหายทั้งหมด";
      case "/formlostitem":
        return "แจ้งของหาย/ตามหาของ";
      case "/guide":
        return "แนะนำการใช้งาน";
      case "/about":
        return "เกี่ยวกับเรา";
      case "/staffhome":
        return "หน้าสำหรับเจ้าหน้าที่";
      case "/emergency":
        return "แจ้งเหตุฉุกเฉิน/กิจกรรม";
      case "/checklist":
        return "รายการรับแจ้งเหตุ";
      case "/checkfinditem":
        return "รายการตามหาเจ้าของ";
      case `/posts/${postId}`:
        return "รายละเอียด";
      case `/posts/edit/${postId}`:
        return "รายการแก้ไข";
      case `/posts/editstaff/${postId}`:
        return "รายการแก้ไขสำหรับเจ้าหน้าที่";
      // Other cases...
      default:
        return "Crime Report System"; // Default title
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const onBack = async () => {
    if (navigationHistory.length > 1) {
      navigationHistory.pop();
      const previousUrl = navigationHistory[navigationHistory.length - 1];
      window.location.href = previousUrl;
    } else {
      window.history.back();
    }
  };

  window.addEventListener("load", addToNavigationHistory);

  return (
    <div>
      <nav className="w-full py-3 bg-customBlue shadow flex items-center justify-between fixed top-0 z-10">
        <div className="flex items-center">
          {(location.pathname === "/home" ||
            location.pathname === "/staffhome") && (
            <img
              src={`${URL}logo.png`}
              alt="Left Logo"
              className="h-7 w-7 ml-2 mr-3"
            />
          )}
          {location.pathname !== "/home" &&
            location.pathname !== "/staffhome" && (
              <img
                onClick={onBack}
                src={`${URL}back.png`}
                alt="Left Logo"
                className="h-5 w-5 ml-2 mr-3 cursor-pointer"
              />
            )}
        </div>
        <div className="flex-1 flex items-center justify-center">
          <p className="text-white text-lg md:text-xl font-bold">
            {getNavbarTitle()}
          </p>
        </div>
        <div className="flex items-center">
          <button
            onClick={isMenuOpen ? closeMenu : toggleMenu}
            className="focus:outline-none"
          >
            <svg
              className="mr-1 h-6 w-6 fill-current text-white"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6 5h12v2H6V5zm0 6h12v2H6v-2zm12 7H6v-2h12v2z"
                />
              ) : (
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M3 5h18v2H3V5zm0 6h18v2H3v-2zm0 6h18v2H3v-2z"
                />
              )}
            </svg>
          </button>
        </div>
      </nav>
      {isMenuOpen && (
        <div className="mt-12 fixed top-1 right-0 h-md bg-black bg-opacity-50 flex justify-end items-center z-10">
          <div className="bg-white w-50 p-1 shadow-lg">
            <ul>
              <li>
                <a
                  href="/lostitem"
                  className="block py-2 px-4 hover:bg-gray-200 rounded"
                  onClick={closeMenu}
                >
                  รายการของหาย
                </a>
              </li>
              <li>
                <a
                  href="/guide"
                  className="block py-2 px-4 hover:bg-gray-200 rounded"
                  onClick={closeMenu}
                >
                  แนะนำการใช้งาน
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="block py-2 px-4 hover:bg-gray-200 rounded"
                  onClick={closeMenu}
                >
                  เกี่ยวกับเรา
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
