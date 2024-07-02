import { useEffect, useState } from "react";
import liff from "@line/liff";
import useAxios from "../../useAxios";
import config from "../../config.json";
import Swal from "sweetalert2";

function Register() {
  const [profile, setProfile] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
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
  }, [profile]);

  const handleSubmit = async () => {
    const fname = document.getElementById("fname").value.trim();
    const lname = document.getElementById("lname").value.trim();
    const college = document.getElementById("college").value.trim();
    const major = document.getElementById("major").value.trim();
    const usercode = document.getElementById("usercode").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    const data = {
      lineid: profile.userId,
      fname: fname,
      lname: lname,
      college: college,
      major: major,
      usercode: usercode,
      email: email,
      password: password,
    };

    try {
      await useAxios.post("/members/register", data);
      Swal.fire({
        title: "สมัครสมาชิกเรียบร้อยแล้ว",
        icon: "success",
        confirmButtonText: "ตกลง",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
    } catch (error) {
      console.error("Error adding member:", error);
    }
  };

  const onLogin = async () => {
    window.location.href = "/login";
  };

  return (
    <div>
      <nav className="w-full py-3 bg-customBlue shadow flex items-center justify-center">
        <div className="flex items-center">
          <p className="text-white text-lg md:text-xl font-bold">
            ลงทะเบียนสมาชิก
          </p>
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

        <div className="py-4 space-y-4">
          <div className="form-group flex flex-wrap mb-4 ">
            <div className="w-1/2">
              <input
                type="text"
                className="w-36 p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                id="fname"
                placeholder="ชื่อ"
              />
            </div>
            <div className="w-1/2">
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                id="lname"
                placeholder="นามสกุล"
              />
            </div>
          </div>
          <div className="form-group">
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              id="college"
              placeholder="คณะ/วิทยาลัย"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              id="major"
              placeholder="สาขาวิชา"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              id="usercode"
              placeholder="รหัสนักศึกษา/บุคลากร"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              id="email"
              placeholder="youremail@rsu.ac.th"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              id="password"
              placeholder="**********"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              id="con-password"
              placeholder="**********"
            />
          </div>
        </div>

        <div className="mt-2">
          <button
            className="w-full bg-customBlue text-white p-2 rounded-lg mb-6 hover:bg-customYellow hover:text-white hover:border hover:border-gray-300"
            onClick={handleSubmit}
          >
            บันทึกข้อมูล
          </button>
          <div className="flex justify-center items-center">
            <span>มีข้อมูลสมาชิกอยู่แล้ว? &nbsp;</span>
            <span
              onClick={onLogin}
              className="hover:underline text-customBlue font-bold"
            >
              {" "}
              เข้าสู่ระบบ
            </span>
          </div>
        </div>
        {errorMessage && (
          <div className="text-center mt-4 text-red-500">{errorMessage}</div>
        )}
      </div>
    </div>
  );
}

export default Register;
