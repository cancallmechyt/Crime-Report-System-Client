import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAxios from '../../useAxios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

function AddIncidence() {
  const { pid } = useParams();
  const [profile, setProfile] = useState([]);
  const [UID, setUID] = useState([]);
  const [img ,setImg] = useState({ imageUrl: '',})
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [value, setValues] = useState({
    pid: pid,
    title: '',
    detail: '',
    category: '',  
    locations: '',
    image: '',
    poststatus: '',
    note: ''
  });

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await useAxios.get(`/posts/${pid}`);
            const userData = response.data; 
            console.log(userData[0]);
            setValues({
                ...value,
                title: userData[0].title,
                detail: userData[0].detail,
                category: userData[0].category, 
                location: userData[0].location,
                image: userData[0].Image,
                poststatus: userData[0].poststatus,
                note: userData[0].note
            });
            setImg({ imageUrl: userData[0].imageUrl });

            const userinfo = await useAxios.get(`/members/${response.data[0].uid}`);
              setProfile(userinfo.data);
              setUID(userinfo.data[0].userId);

        } catch (err) { console.log(err); }
    }; fetchData();
  }, [pid]);

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
          denyButtonText: `Don't save`
      }).then(async (result) =>{
          if (result.isConfirmed) {
              const formData = new FormData();
                  formData.append('title', value.title);
                  formData.append('category', value.category);
                  formData.append('location', value.location);
                  formData.append('detail', value.detail);
                  formData.append('poststatus', value.poststatus);
                  formData.append('note', value.note);
                  formData.append('pid', pid);
  
              // เพิ่มเช็คว่ามีการเลือกไฟล์ใหม่หรือไม่
              if (selectedImage) {
                  formData.append('file', selectedImage);
              } else {
                  // หากไม่มีการเลือกไฟล์ใหม่ ให้ใช้รูปภาพเดิมโดยไม่เปลี่ยนแปลง
                  formData.append('Images', value.image);
              }
  
              await useAxios.put(`/posts/admin/edit/${pid}`, formData, {
                  headers: {
                      'Content-Type': 'multipart/form-data'
                  }
              });
              Swal.fire("Saved!", "", "success").then(() => {
                  window.location.reload();
              });
          } else if (result.isDenied) {
              Swal.fire("Changes are not saved", "", "info");
            }
          });
        } catch (error) {
            console.error('เกิดข้อผิดพลาดในการอัปเดตข้อมูล:', error);
            alert('เกิดข้อผิดพลาดในการอัปเดตข้อมูล');
        }
    };

    const handleDelete = async () => {
      try {
          Swal.fire({
              title: "ต้องการลบรายการใช่หรือไม่",
              showCancelButton: true,
              confirmButtonText: "ลบ",
              confirmButtonColor: "#E72929",
              cancelButtonText: "ยกเลิก", 
              denyButtonText: `Don't save`
          }).then(async (result) => {
              if (result.isConfirmed) {
                  await useAxios.delete(`/posts/${pid}`);
                  Swal.fire("ลบแล้ว!", "", "success").then(() => {
                    window.location.href = '/admin/incidence';
                  });
              } else if (result.isDenied) {
                  Swal.fire("ไม่ได้บันทึกการเปลี่ยนแปลง", "", "info");
              }
          });
      } catch (error) { 
          console.error('เกิดข้อผิดพลาดในการลบโพสต์:', error); 
      }
    };

  return (
    <div className="p-4 sm:ml-64" > 
      <h1 className="mb-1">แก้ไขรายการแจ้งเหตุ</h1>
      <form className="pt-4 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700">
        <div className="flex">
          <div id="Pic" className="form-group items-center mr-5 ml-5">
            <div>
              <img 
                src={selectedImage ? imagePreview : img.imageUrl}  
                className="w-80 h-80 mt-1 rounded-md mb-2"
                alt="ว่างเปล่า"
              />
            </div>

            <div className="mt-4 rounded bg-gray-200">
              {profile.map((item, index) => (
                <div key={index} className="flex flex-col">
                  <div className="flex items-center">
                    <div className="ml-2 h-10 w-10 rounded-full overflow-hidden bg-white mr-2">
                      <img src={"/public/user.svg"} 
                           alt="Profile" className="ml-1 items-center h-8 w-8 object-cover mt-1 " />
                    </div>
                    <div>
                      <Link to={`/list/${UID}`}>
                        <p className="text-left text-s font-bold">{item.fname} {item.lname}</p>
                      </Link>
                        <p className="text-s text-left text-customGrays mr-2 mb-1">คณะ : {item.college}</p>
                    </div> 
                  </div>
                </div>
              ))}
            </div>

        </div>
        <div id="Detail" className="w-2/3 pl-4">
            <div className="mb-2">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">หัวเรื่อง (หัวข้อ)</label>
                <input 
                    type="text"
                    id="title" 
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    placeholder="หัวข้อ" required
                    value={value.title} 
                    onChange={e => setValues({...value, title : e.target.value})} 
                />
            </div>
            <div className="mb-2">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">รายละเอียด</label>
                <textarea 
                    id="detail" 
                    rows="4" 
                    className="mb-4 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    placeholder="รายละเอียด"
                    value={value.detail} 
                    onChange={e => setValues({...value, detail : e.target.value})}
                ></textarea>
            </div>
            <div className="grid mt-2 mb-2 gap-6 md:grid-cols-2">
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">หมวดหมู่</label>
                    <select 
                        id="category" 
                        value={value.category} 
                        onChange={e => setValues({...value, category : e.target.value})}
                        defaultValue="" 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                        <option value="" disabled>เลือกหมวดหมู่</option>
                        <option value="แจ้งเหตุ">รายการแจ้งเหตุ</option>
                        <option value="ของหาย">รายการของหาย</option>
                        <option value="ตามหาของ">รายการตามหาของ</option>
                        <option value="เหตุฉุกเฉิน">รายการเหตุฉุกเฉิน</option>
                    </select>
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">สถานที่</label>
                    <select 
                      defaultValue="" 
                      id="location" 
                      value={value.location} 
                      onChange={e => setValues({...value, location : e.target.value})} 
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value="" disabled>เลือกสถานที่</option>
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
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">สถานะของรายการ</label>
                    <select 
                      id="poststatus" 
                      value={value.poststatus} 
                      onChange={e => setValues({...value, poststatus : e.target.value})} 
                      defaultValue="" 
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value="" disabled>เลือกสถานะ</option>
                        <option value="กำลังดำเนินการ">กำลังดำเนินการ</option>
                        <option value="กำลังตามหา">กำลังตามหา</option>
                        <option value="เสร็จสิ้น">เสร็จสิ้น</option>
                    </select>        
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">หมายเหตุ</label>
                    <input 
                        type="text" 
                        id="note" 
                        value={value.note} 
                        onChange={e => setValues({...value, note : e.target.value})} 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        placeholder="หมายเหตุ"
                    />
                </div>
            </div>
            <div className="mt-2 form-group">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">อัพโหลดไฟล์รูปภาพ</label>
                <input 
                    type="file" 
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-300 dark:border-gray-300 dark:placeholder-gray-300"
                    onChange={handleImageChange} 
                />
                <p className="mt-1 mb-6 text-sm text-gray-500 dark:text-gray-300">PNG or JPG (800x400px).</p>
            </div>
            <div className="flex items-start mb-2">
                <div className="flex items-center h-5">
                    <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"/>
                </div>
                <label className="mb-2 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">ตรวจสอบแล้วว่าข้อมูลที่กรอกทั้งหมดมีความ<a className="text-blue-600 hover:underline dark:text-blue-500">ถูกต้อง</a></label>
            </div>
            <button 
  type="button" 
  className="float-right text-white bg-customRed hover:bg-customYellow focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" 
  onClick={handleDelete} 
>ลบ</button>            <button type="submit" className="float-right mr-2 text-white bg-customBlue hover:bg-customYellow focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handleSubmit} >บันทึก</button>
        </div>
        </div>
      </form>
    </div>
  )
}

export default AddIncidence