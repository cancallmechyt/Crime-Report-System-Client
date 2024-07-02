import useAxios from "../../useAxios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import dayjs from "dayjs"; 
dayjs.locale("th");
import moment from "moment";
import config from "../../config.json";

function SingleForm() {
  const URL = config.URL_BASE;
  const { pid } = useParams();
  const [postData, setPostData] = useState([]);
  const [profile, setProfile] = useState([]);
  const [userIdMatch, setUserIdMatch] = useState(false);
  const [status, setStatus] = useState(false);

  useEffect(() => {
    if (pid) {
      const fetchData = async () => {
        try {
          const response = await useAxios.get(`/posts/${pid}`);
          setStatus(response.data[0].poststatus === "เสร็จสิ้น" ? true : false);
          const posts = response.data.map((post) => {
            const dateObject = post.date;
            const formattedDate = dayjs(dateObject).format("DD MMM YYYY");
            return {
              ...post,
              Date: formattedDate,
              StatusColor: setStatusColor(post.poststatus),
            };
          });
          setPostData(posts);

          const uid = localStorage.getItem("section");
          const userinfo = await useAxios.get(`/members/${uid}`);
          setProfile(userinfo.data);

          if (userinfo.data.length > 0) {
            const POST_UID = response.data[0].uid;
            const LOGIN_UID = userinfo.data[0].uid;

            const ROLE_USER = userinfo.data[0].role;

            if (ROLE_USER === "user") {
              if (POST_UID === LOGIN_UID) {
                setUserIdMatch(true);
              }
            } else if (ROLE_USER === "police" || ROLE_USER === "admin") {
              setUserIdMatch(true);
            } else {
              setUserIdMatch(false);
            }
          }
        } catch (error) {
          console.error("Error:", error);
        }
      };
      fetchData();
    }
  }, [pid]);

  const setStatusColor = (status) => {
    if (status === "กำลังดำเนินการ") {
      return "bg-customOrange";
    } else if (status === "เสร็จสิ้น") {
      return "bg-customGreen";
    } else if (status === "เหตุฉุกเฉิน") {
      return "bg-customReds";
    } else {
      return "bg-customBlue";
    }
  };

  return (
    <div className="mt-12 min-h-screen min-w-screen bg-gray-100">
      <div className="ml-5 mr-5 rounded-b-md bg-white">
        <ul>
          {postData.map((item, index) => (
            <li key={index}>
              <div
                className="overflow-hidden rounded-md mb-2 flex items-center justify-center mx-auto text-center"
                style={{
                  width: "310px",
                  height: "310px",
                  position: "relative",
                }}
              >
                <img
                  src={item.imageUrl}
                  className="mt-10 w-full h-full object-cover"
                  alt="Post"
                />
                <p className="absolute top-6 ml-2 left-0 mt-1 mr-2 bg-customYellow text-white py-1.5 px-1.5 rounded-md text-xs font-medium">
                  {item.category}
                </p>
                {userIdMatch && (
                  <p
                    className={`absolute bottom-2 ml-2 right-0 mt-1 mr-2 text-white py-1.5 px-1.5 rounded-md text-xs font-medium ${item.StatusColor}`}
                  >
                    {item.poststatus}
                  </p>
                )}
              </div>

              <h2 className="mt-4 ml-7 text-2xl text-left font-bold">
                {item.title}
              </h2>
              <div className="mt-2 flex items-center">
                <img
                  className="ml-7 w-4 h-4"
                  src={`${URL}marker.png`}
                  alt="Location Marker"
                />
                <p className="ml-2 font-bold text-customGrays">
                  {item.location}  •  {item.Date}
                  {" • " + moment(item.time, "HH:mm").format("HH:mm") + " น."}
                </p>
                <br />
              </div>

              <ul className="mt-4">
                {profile.map((profileItem, profileIndex) => (
                  <li key={profileIndex}>
                    <div className="flex items-center">
                      <div className="ml-7 h-10 w-10 rounded-full overflow-hidden bg-customBlue mr-2">
                        <img
                          src={`${URL}user.png`}
                          alt="Profile"
                          className="ml-1 items-center h-8 w-8 object-cover mt-1"
                        />
                      </div>
                      <div>
                        <p className="text-left font-bold">
                          {profileItem.fname} {profileItem.lname}
                        </p>
                        <p className="text-xs text-left text-customGrays">
                          คณะ : {profileItem.college}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-4">
                <p className="ml-7 text-left text-l font-bold">รายละเอียด</p>
                <p className="mt-2 text-customGrays ml-7 text-left mr-10">
                  {item.detail}
                </p>
              </div>

              <div className="mt-2">
                {userIdMatch && (
                  <div className="mt-2">
                    <p className="ml-7 text-left text-l font-bold">หมายเหตุ</p>
                    <p className="mt-1 text-customGrays ml-7 text-left mr-10">
                      {item.note}
                    </p>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-4 flex flex-col items-center pb-16">
          {userIdMatch && !status && (
            <Link
              className="flex items-center justify-center mb-6 mt-6 w-48 bg-customBlue text-white p-2 rounded-lg mb-2 hover:bg-customYellow hover:text-white hover:border hover:border-gray-300"
              to={`/posts/edit/${pid}`}
            >
              แก้ไข
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default SingleForm;
