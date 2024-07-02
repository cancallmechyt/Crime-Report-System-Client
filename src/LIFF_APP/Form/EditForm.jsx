import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useAxios from "../../useAxios";
import Swal from "sweetalert2";
import liff from "@line/liff";
import config from "../../config.json";

function EditForm() {
  const LIFF_ID = config.LIFF_ID_KEY;
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [profile, setProfile] = useState([]);
  const [userRoleMatch, setRoleMatch] = useState(false);
  const { pid } = useParams();
  const [Cat, setCat] = useState([]);
  const [img, setImg] = useState({ imageUrl: "" });
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
        console.error(e);
      }
    };
    initializeLiff();
    return () => {};
  }, []);

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
          pid: postData[0].pid,
        });
        setImg({ imageUrl: postData[0].imageUrl });
        setCat(postData[0].category === "ของหาย");
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [pid]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const uid = localStorage.getItem("section");
        const users = await useAxios.get(`/members/${uid}`);
        const checkrole = users.data[0].role;

        if (checkrole === "police" || checkrole === "admin") {
          setRoleMatch(true);
        } else {
          setRoleMatch(false);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    if (profile.userId) {
      fetchData();
    }
  }, [profile]);

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

          await useAxios.put(`/posts/edit/${pid}`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
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
            window.location.href = "/list";
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

        <form className="mt-2">
          <div className="form-group">
            <label className="ml-1 font-bold">หัวเรื่อง : </label>
            <br />
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              value={value.title}
              onChange={(e) => setValues({ ...value, title: e.target.value })}
            ></input>
          </div>

          <div className="mt-2">
            <label className="ml-1 font-bold">รายละเอียด : </label>
            <br />
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              value={value.detail}
              onChange={(e) => setValues({ ...value, detail: e.target.value })}
            ></input>
          </div>

          <div className="mt-2">
            <label className="ml-1 font-bold">หมวดหมู่ : </label>
            <br />
            <label value={value.category}></label>
            <select
              className="w-full rounded-md border border-gray-300"
              name="category"
              value={value.category}
              onChange={(e) =>
                setValues({ ...value, category: e.target.value })
              }
            >
              <option value="แจ้งเหตุ">แจ้งเหตุ</option>
              <option value="ของหาย">ของหาย</option>
              {userRoleMatch && <option value="ตามหาของ">ตามหาของ</option>}
            </select>{" "}
            <br />
          </div>
          {Cat && (
            <div className="form-group">
              <label>สถานะ : </label>
              <br />
              <select
                className="w-full rounded-md border border-gray-300"
                name="status"
                value={value.poststatus}
                onChange={(e) =>
                  setValues({ ...value, poststatus: e.target.value })
                }
              >
                <option value="กำลังตามหา">กำลังตามหา</option>
                <option value="เสร็จสิ้น">เสร็จสิ้น</option>
              </select>
            </div>
          )}
          <div className="mt-2">
            <label className="ml-1 font-bold">สถานที่ : </label>
            <br />
            <select
              className="w-full rounded-md border border-gray-300"
              name="location"
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

          <div className="mt-2 form-group">
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

        <div className="mt-3 flex flex-col items-center pb-16">
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
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditForm;
