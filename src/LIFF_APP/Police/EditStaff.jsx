import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useAxios from "../../useAxios";
import Swal from "sweetalert2";

function EditStaff() {
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [img, setImg] = useState({ imageUrl: "" });
  const [profile, setProfile] = useState([]);
  const [UID, setUID] = useState([]);
  const { pid } = useParams();
  const [value, setValues] = useState({
    pid: pid,
    title: "",
    detail: "",
    category: "",
    location: "",
    image: "",
    poststatus: "",
    note: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await useAxios.get(`/posts/${pid}`);
        const postData = response.data;
        setValues({
          ...value,
          title: postData[0].title,
          detail: postData[0].detail,
          category: postData[0].category,
          location: postData[0].location,
          image: postData[0].image,
          poststatus: postData[0].poststatus,
          note: postData[0].note,
        });
        setImg({ imageUrl: postData[0].imageUrl });

        const uid = localStorage.getItem("section");
        const userinfo = await useAxios.get(`/members/${uid}`);

        setProfile(userinfo.data);
        setUID(userinfo.data[0].lineid);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [pid]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      Swal.fire({
        title: "บันทึกข้อมูลหรือไม่",
        text: "",
        showCancelButton: true,
        confirmButtonText: "ใช่",
        confirmButtonColor: "#28a745",
        cancelButtonText: "ยกเลิก",
        denyButtonText: `Don't save`,
      }).then(async (result) => {
        if (result.isConfirmed) {
          const formData = new FormData();
          formData.append("title", value.title);
          formData.append("category", value.category);
          formData.append("location", value.location);
          formData.append("detail", value.detail);
          formData.append("poststatus", value.poststatus);
          formData.append("note", value.note);
          formData.append("pid", pid);

          // เพิ่มเช็คว่ามีการเลือกไฟล์ใหม่หรือไม่
          if (selectedImage) {
            formData.append("file", selectedImage);
          } else {
            // หากไม่มีการเลือกไฟล์ใหม่ ให้ใช้รูปภาพเดิมโดยไม่เปลี่ยนแปลง
            formData.append("image", value.image);
          }

          await useAxios.put(`/posts/admin/edit/${pid}`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          await useAxios.post(`/line/success/${UID}`);
          Swal.fire("Saved!", "", "success").then(() => {
            window.location.reload();
          });
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการอัปเดตข้อมูล:", error);
      alert("เกิดข้อผิดพลาดในการอัปเดตข้อมูล");
    }
  };

  const onDelete = async () => {
    try {
      Swal.fire({
        title: "ต้องการลบหรือไม่",
        text: "",
        showCancelButton: true,
        confirmButtonText: "ลบ",
        confirmButtonColor: "#E72929",
        cancelButtonText: "ยกเลิก",
        denyButtonText: `Don't save`,
      }).then(async (result) => {
        if (result.isConfirmed) {
          await useAxios.delete(`/posts/${pid}`);
          Swal.fire("Saved!", "", "success").then(() => {
            window.location.href = "/checkfinditem";
          });
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการลบโพสต์:", error);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(file); // get new select image
        setImagePreview(reader.result); // show new image
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="mt-12 bt-5 min-h-screen min-w-screen bg-gray-100">
      <div className="p-4 ml-5 mr-5 rounded-b-md bg-white">
        <div className="mt-1">
          <h3 className="ml-1 text-l font-bold">ข้อมูลเกี่ยวกับเหตุ</h3>
          <p className="ml-1 text-gray-500">กรุณากรอกข้อมูลต่างๆให้ครบถ้วน</p>
          <p className="ml-1 text-red-600 font-bold">
            * กรอกข้อมูลตามความเป็นจริง
          </p>
        </div>

        <form>
          <div className="form-group">
            <label className="ml-1 font-bold">สถานะ : </label>
            <br />
            <select
              className="w-full rounded-md border border-gray-300"
              name="status"
              value={value.poststatus}
              onChange={(e) =>
                setValues({ ...value, poststatus: e.target.value })
              }
            >
              <option value="กำลังดำเนินการ">กำลังดำเนินการ</option>
              <option value="กำลังตามหา">กำลังตามหา</option>
              <option value="เสร็จสิ้น">เสร็จสิ้น</option>
            </select>
          </div>
          <div className="mt-1 form-group">
            <label className="ml-1 font-bold">หัวข้อ : </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              value={value.title}
              onChange={(e) => setValues({ ...value, title: e.target.value })}
            ></input>
          </div>
          <div className="form-group">
            <label className="ml-1 font-bold">รายละเอียด : </label>
            <textarea
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              value={value.detail}
              onChange={(e) => setValues({ ...value, detail: e.target.value })}
            ></textarea>
          </div>
          <div className="form-group">
            <label className="ml-1 font-bold">สถานที่ : </label>
            <select
              className="w-full rounded-md border border-gray-300"
              name="Locations"
              value={value.location}
              onChange={(e) =>
                setValues({ ...value, location: e.target.value })
              }
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
            </select>{" "}
            <br />
          </div>
          <div className="form-group">
            <label className="ml-1 font-bold">หมายเหตุ : </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              value={value.note}
              onChange={(e) => setValues({ ...value, note: e.target.value })}
            ></input>
          </div>

          <div className="form-group">
            <input
              type="file"
              className="mt-3 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-300 dark:border-gray-300 dark:placeholder-gray-300"
              onChange={handleImageChange}
            />
          </div>
          <div className="form-group flex justify-center items-center">
            <div className="relative w-48 h-48 ">
              <img
                src={selectedImage ? imagePreview : img.imageUrl}
                className="w-48 h-48 mt-4 rounded-md mb-2 "
                alt="ว่างเปล่า"
              />
            </div>
          </div>
        </form>

        <ul className="mt-10 mx-auto">
          {profile.map((item, index) => (
            <li key={index} className="text-center">
              <p className="font-bold">ข้อมูลผู้โพส</p>
              <p className="text-center">{item.fname + " " + item.lname}</p>
              <p className="text-center">วิทยาลัย{item.college}</p>
            </li>
          ))}
        </ul>

        <div className="flex flex-col items-center pb-12">
          <div className="flex">
            <button
              className="mt-4 mr-2 w-auto bg-customBlue text-white p-2 rounded-lg mb-2 hover:bg-customYellow hover:text-white hover:border hover:border-gray-300"
              onClick={handleSubmit}
            >
              บันทึก
            </button>
            <button
              className="mt-4 w-auto bg-customRed text-white p-2 rounded-lg mb-2 hover:bg-customYellow hover:text-white hover:border hover:border-gray-300"
              onClick={onDelete}
            >
              ลบ
            </button>{" "}
            <br />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditStaff;
