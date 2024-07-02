import { useState } from "react";
import useAxios from "../../useAxios";
import Swal from "sweetalert2";

function FormIncidence() {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const uid = "1";
    const title = document.getElementById("title").value;
    const detail = document.getElementById("detail").value;
    const location = document.getElementById("location").value;
    const category = "แจ้งเหตุ";
    const poststatus = "กำลังดำเนินการ";
    const note = "หมายเหตุ";
    const fileInput = document.getElementById("file");
    const file = fileInput.files[0];

    const formData = new FormData();
    formData.append("title", title);
    formData.append("detail", detail);
    formData.append("location", location);
    formData.append("file", file);
    formData.append("category", category);
    formData.append("poststatus", poststatus);
    formData.append("note", note);
    formData.append("uid", uid);

    try {
      if (title && detail) {
        const response = await useAxios.post("/posts/addnew", formData);
        console.log(response);
        Swal.fire({
          title: "กรอกข้อมูลสำเร็จ",
          icon: "success",
          confirmButtonText: "ตกลง",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "/home";
          }
        });
      } else {
        Swal.fire({
          title: "กรอกข้อมูลให้ครบถ้วน",
          icon: "warning",
          confirmButtonText: "ตกลง",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        title: "เกิดข้อผิดพลาด",
        text: `Error: ${error.message}`,
        icon: "error",
        confirmButtonText: "ตกลง",
      });
    }
  };

  const onForm = async () => {
    window.location.href = "/form";
  };

  const onFormLostItem = async () => {
    window.location.href = "/formlostitem";
  };

  return (
    <div className="mt-12 bt-5 min-h-screen min-w-screen bg-gray-100">
      <div className="p-4 ml-5 mr-5 rounded-b-md bg-white pb-16">
        <div className="flex justify-left">
          <div>
            <p
              onClick={onForm}
              className="mt-1 bg-customYellow text-white py-1.5 px-2.5 rounded-md text-l font-medium cursor-pointer"
            >
              แจ้งเหตุ
            </p>
          </div>
          <div>
            <p
              onClick={onFormLostItem}
              className="ml-2 mt-1 bg-customBlue text-white py-1.5 px-2.5 rounded-md text-l font-medium cursor-pointer"
            >
              แจ้งของหาย
            </p>
          </div>
        </div>
        <div className="mt-4">
          <h3 className="ml-1 text-l font-bold">ข้อมูลเกี่ยวกับเหตุ</h3>
          <p className="ml-1 text-gray-500">กรุณากรอกข้อมูลต่างๆให้ครบถ้วน</p>
          <p className="ml-1 text-red-600 font-bold">
            * กรอกข้อมูลตามความเป็นจริง
          </p>
        </div>
        <form className="mt-4" onSubmit={handleSubmit}>
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
              type="submit"
              className="mt-4 w-full bg-customBlue text-white p-2 rounded-lg mb-2 hover:bg-customYellow hover:text-white hover:border hover:border-gray-300"
            >
              แจ้งเรื่อง
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormIncidence;
