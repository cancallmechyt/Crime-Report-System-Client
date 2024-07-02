import { useEffect, useState } from "react";
import liff from "@line/liff";
import useAxios from "../../useAxios";
import config from "../../config.json";

function Login() {
  const [profile, setProfile] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const LIFF_ID = config.LIFF_ID_KEY;

  useEffect(() => {
    const initializeLiff = async () => {
      try {
        await liff.init({ liffId: LIFF_ID });
        if (!liff.isLoggedIn()) {
          liff.login();
        } else {
          const userProfile = await liff.getProfile();
          setProfile(userProfile);
        }
      } catch (e) {
        console.log("");
      }
    };
    initializeLiff();
    return () => {};
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await useAxios.post(
        "/members/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      const token = response.data.token;
      const uid = response.data.uid;

      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("section", uid);

        const data = await useAxios.get(`/members/${uid}`);
        const role = data.data[0].role;

        const welcome = {
          lineid: data.data[0].lineid,
          fname: data.data[0].fname,
        };

        const richmenu = {
          lineid: data.data[0].lineid,
        };

        if (role === "user") {
          await useAxios.post("/line/welcome", welcome);
          await useAxios.post("/line/richmenuuser", richmenu);
          window.location.href = "/home";
        } else if (role === "police") {
          await useAxios.post("/line/welcome", welcome);
          await useAxios.post("/line/richmenupolice", richmenu);
          window.location.href = "/staffhome";
        }
      } else {
        setError("Login failed. Please try again.");
      }
    } catch (error) {
      console.log("error", error);
      setError("Login failed. Please try again.");
    }
  };

  const onRegister = async () => {
    window.location.href = "/register";
  };

  return (
    <div>
      <nav className="w-full py-3 bg-customBlue shadow flex items-center justify-center">
        <div className="flex items-center">
          <p className="text-white text-lg md:text-xl font-bold">เข้าสู่ระบบ</p>
        </div>
      </nav>

      <div className="p-8">
        {profile ? (
          <div className="flex flex-col items-center mt-4">
            <img
              className="w-32 h-32 rounded-full mb-2"
              src={profile.pictureUrl}
              alt="Line Image"
            />
            <div className="text-lg">สวัสดีคุณ {profile.displayName}</div>
          </div>
        ) : (
          <div className="mt-4">Loading...</div>
        )}

        <div className="form-group">
          <div className="mt-6">
            <label>Email</label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              placeholder="your@rsu.ac.th"
            />
          </div>
          <div className="mt-2">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              id="password"
              placeholder="•••••••••••"
            />
          </div>
        </div>
        <div className="mt-4">
          <button
            className="w-full bg-customBlue text-white p-2 rounded-lg mb-6 hover:bg-customYellow hover:text-white hover:border hover:border-gray-300"
            onClick={handleSubmit}
          >
            เข้าสู่ระบบ
          </button>
          <div className="flex justify-center items-center">
            <span>ยังไม่มีข้อมูลสมาชิก? &nbsp;</span>
            <span
              onClick={onRegister}
              className="hover:underline text-customBlue font-bold"
            >
              {" "}
              ลงทะเบียน
            </span>
          </div>
        </div>
        {error && <div className="text-center mt-4 text-red-500">{error}</div>}
      </div>
    </div>
  );
}

export default Login;
