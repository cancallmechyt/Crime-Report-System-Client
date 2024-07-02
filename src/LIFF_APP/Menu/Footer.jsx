import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import useAxios from "../../useAxios";
import config from "../../config.json";

function Footer() {
  const [userRoleMatch, setRoleMatch] = useState(false);
  const location = useLocation();
  const URL = config.URL_BASE;

  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const uid = localStorage.getItem("section");
        const userinfo = await useAxios.get(`/members/${uid}`);

        const checkrole = userinfo.data[0].role;

        if (checkrole === "police" || checkrole === "admin") {
          setRoleMatch(true);
        } else {
          setRoleMatch(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchAPI();
  }, []);

  return (
    <div className="fixed bottom-0 w-full">
      <nav className="w-full py-2 bg-customBlue shadow flex justify-around">
        <div className="flex items-center">
          <Link to="/home">
            <div
              className={`flex justify-center items-center rounded-full h-10 w-10 ${
                location.pathname === "/home" ? "bg-customSky" : ""
              }`}
            >
              <img src={`${URL}home.png`} alt="Home" className="h-7 w-7" />
            </div>
          </Link>
        </div>
        <div className="flex items-center">
          <Link to="/form">
            <div
              className={`flex justify-center items-center rounded-full h-10 w-10 ${
                location.pathname === "/form" ? "bg-customSky" : ""
              }`}
            >
              <img src={`${URL}edit.png`} alt="Edit" className="h-7 w-7" />
            </div>
          </Link>
        </div>
        {userRoleMatch && (
          <div className="flex items-center">
            <Link to="/staffhome">
              <div
                className={`flex justify-center items-center rounded-full h-10 w-10 ${
                  location.pathname === "/staffhome" ? "bg-orange-500" : ""
                }`}
              >
                <img
                  src={`${URL}police.png`}
                  alt="Police"
                  className="h-7 w-7"
                />
              </div>
            </Link>
          </div>
        )}
        <div className="flex items-center">
          <Link to="/list">
            <div
              className={`flex justify-center items-center rounded-full h-10 w-10 ${
                location.pathname === "/list" ? "bg-customSky" : ""
              }`}
            >
              <img src={`${URL}mine.png`} alt="Mine" className="h-7 w-7" />
            </div>
          </Link>
        </div>
        <div className="flex items-center">
          <Link to="/profile">
            <div
              className={`flex justify-center items-center rounded-full h-10 w-10 ${
                location.pathname === "/profile" ? "bg-customSky" : ""
              }`}
            >
              <img
                src={`${URL}profile.png`}
                alt="Profile"
                className="h-7 w-7"
              />
            </div>
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default Footer;
