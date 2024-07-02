import Swal from "sweetalert2";
import useAxios from "../../useAxios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function EditMember() {
  const { uid } = useParams();
  const [showPassword, setShowPassword] = useState(false);
  const [value, setValues] = useState({
    uid: uid,
    lineid: "",
    fname: "",
    lname: "",
    college: "",
    major: "",
    usercode: "",
    email: "",
    password: "",
    role: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userinfo = await useAxios.get(`/members/${uid}`);
        const userData = userinfo.data;
        console.log(userinfo);
        setValues({
          ...value,
          fname: userData[0].fname,
          lname: userData[0].lname,
          college: userData[0].college,
          major: userData[0].major,
          usercode: userData[0].usercode,
          email: userData[0].email,
          password: userData[0].password,
          role: userData[0].role,
        });
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [uid]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await Swal.fire({
        title: "บันทึกข้อมูลหรือไม่",
        text: "",
        showCancelButton: true,
        confirmButtonText: "ใช่",
        confirmButtonColor: "#28a745",
        cancelButtonText: "ยกเลิก",
      });

      if (result.isConfirmed) {
        const updatedData = { ...value };

        await useAxios.put(`/members/edit/${uid}`, updatedData, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        Swal.fire("บันทึกข้อมูลสำเร็จ!", "", "success").then(() => {
          window.location.reload();
        });
      } else {
        Swal.fire("ข้อมูลไม่ถูกบันทึก", "", "info");
      }
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการอัปเดตข้อมูล:", error);
      Swal.fire("เกิดข้อผิดพลาดในการอัปเดตข้อมูล", "", "error");
    }
  };

  return (
    <div className="p-4 sm:ml-64">
      <h1 className="mb-1">แก้ไขสมาชิก</h1>

      <form>
        <div className="mt-4 grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              รหัสนักศึกษา
            </label>
            <input
              type="text"
              value={value.usercode}
              onChange={(e) =>
                setValues({ ...value, usercode: e.target.value })
              }
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              บทบาท
            </label>
            <select
              id="role"
              value={value.role}
              onChange={(e) => setValues({ ...value, role: e.target.value })}
              defaultValue=""
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="" disabled>
                เลือกบทบาท
              </option>
              <option value="admin">ผู้ดูแลระบบ</option>
              <option value="police">ตำรวจ</option>
              <option value="user">ผู้ใช้งาน</option>
            </select>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              ชื่อ
            </label>
            <input
              type="text"
              value={value.fname}
              onChange={(e) => setValues({ ...value, fname: e.target.value })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              นามสกุล
            </label>
            <input
              type="text"
              value={value.lname}
              onChange={(e) => setValues({ ...value, lname: e.target.value })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              คณะ / วิทยาลัย
            </label>
            <input
              type="text"
              value={value.college}
              onChange={(e) => setValues({ ...value, college: e.target.value })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              สาขาวิชา
            </label>
            <input
              type="text"
              value={value.major}
              onChange={(e) => setValues({ ...value, major: e.target.value })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Email address
          </label>
          <input
            type="email"
            id="email"
            value={value.email}
            onChange={(e) => setValues({ ...value, email: e.target.value })}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="youremail@rsu.ac.th"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              onChange={(e) =>
                setValues({ ...value, password: e.target.value })
              }
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="••••••••••••"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <div className="flex items-start mb-4">
          <div className="flex items-center h-5">
            <input
              id="remember"
              type="checkbox"
              value=""
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
              required
            />
          </div>
          <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            ตรวจสอบแล้วว่าข้อมูลที่กรอกทั้งหมดมีความ
            <a className="text-blue-600 hover:underline dark:text-blue-500">
              ถูกต้อง
            </a>
          </label>
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default EditMember;
