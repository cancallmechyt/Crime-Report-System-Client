import { useState } from "react";
import useAxios from "../../useAxios";
import Swal from "sweetalert2";

function Emergency() {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const detail = document.getElementById("detail").value;
    const location = document.getElementById("location").value;
    const category = document.getElementById("category").value;
    const fileInput = document.getElementById("file");
    const file = fileInput.files[0];

    const formData = new FormData();
    formData.append("title", title);
    formData.append("detail", detail);
    formData.append("location", location);
    formData.append("category", category);
    formData.append("file", file);
    formData.append("poststatus", "เหตุฉุกเฉิน");
    formData.append("note", "หมายเหตุ");

    try {
      if (title && detail) {
        if (selectedImage) {
          const response = await useAxios.post("/posts/addnews", formData);
          const data = await useAxios.get(`/posts/${response.data}`);

          const info = {
            pid: data.data[0].pid,
            category: data.data[0].category,
            title: data.data[0].title,
            detail: data.data[0].detail,
            image: "https://localhost:5000/posts/pic/00.jpg", // (data.data[0].imageUrl) change before upload API to server
            location: data.data[0].location,
          };

          await useAxios.post("/line/emergency", info);

          Swal.fire({
            title: "แจ้งเหตุฉุกเฉินเรียบร้อย",
            icon: "success",
            confirmButtonText: "ตกลง",
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.reload();
            }
          });
        } else {
          Swal.fire({
            title: "กรุณาใส่รูปภาพ",
            icon: "warning",
            confirmButtonText: "ตกลง",
          });
        }
      } else {
        Swal.fire({
          title: "กรุณากรอกข้อมูลให้ครบถ้วน",
          icon: "warning",
          confirmButtonText: "ตกลง",
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="mt-12 bt-5 min-h-screen min-w-screen bg-gray-100">
      <div className="p-4 ml-5 mr-5 rounded-b-md bg-white pb-16">
        <div className="mt-4">
          <h3 className="ml-1 text-l font-bold">ข้อมูลเกี่ยวกับเหตุฉุกเฉิน</h3>
          <p className="ml-1 text-red-600 font-bold">
            * กรอกข้อมูลตามความเป็นจริง
          </p>
          <p className="ml-1 text-red-600 font-bold">
            * เมื่อกดแจ้งเหตุข้อมูลจะไปทันที
          </p>
        </div>

        <form className="mt-4">
          <div className="form-group">
            <label className="ml-1 font-bold">หัวเรื่อง : </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              id="title"
              placeholder="ระบุหัวเรื่อง (จำเป็น)"
            />
          </div>

          <div className="mt-2">
            <label className="ml-1 font-bold">รายละเอียด : </label>
            <textarea
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              id="detail"
              placeholder="ระบุรายละเอียด (จำเป็น)"
            />
          </div>

          <div className="form-group">
            <label className="ml-1 font-bold">หมวดหมู่ : </label>
            <select
              id="category"
              className="w-full p-2 border border-gray-300 rounded-md mt-1"
            >
              <option value="เหตุฉุกเฉิน">เหตุฉุกเฉิน</option>
              <option value="กิจกรรม">กิจกรรม</option>
            </select>
          </div>

          <div className="mt-2 ">
            <label className="ml-1 font-bold">สถานที่ : </label>
            <select
              id="location"
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="ตึก 1">ตึก 1</option>
              <option value="ตึก 2">ตึก 2</option>
              <option value="ตึก 3">ตึก 3</option>
              <option value="ตึก 4">ตึก 4</option>
              <option value="ตึก 5">ตึก 5</option>
              <option value="ตึก 6">ตึก 6</option>
              <option value="ตึก 7">ตึก 7</option>
              <option value="ตึก 8">ตึก 8</option>
              <option value="ตึก 9">ตึก 9</option>
              <option value="ตึก 10">ตึก 10</option>
              <option value="ตึก 11">ตึก 11</option>
              <option value="ตึก 12">ตึก 12</option>
              <option value="ตึก 13">ตึก 13</option>
              <option value="ตึก 14">ตึก 14</option>
              <option value="ตึก 15">ตึก 15</option>
            </select>
          </div>

          <div className="py-4">
            <input
              type="file"
              id="file"
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              onChange={handleImageChange}
            />
          </div>

          {selectedImage && (
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="Selected"
              className="w-32 h-32 rounded-md mb-2 mx-auto"
            />
          )}

          <div className="flex flex-col items-center">
            <button
              className="mt-4 w-full bg-customBlue text-white p-2 rounded-lg mb-2 hover:bg-customYellow hover:text-white hover:border hover:border-gray-300"
              onClick={handleSubmit}
            >
              แจ้งเรื่อง
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Emergency;
