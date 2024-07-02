import { useState } from 'react';
import useAxios from '../../useAxios';
import Swal from 'sweetalert2';

function AddIncidence() {
  const [selectedImage, setSelectedImage] = useState(null);
  
  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const detail = document.getElementById('detail').value;
    const location = document.getElementById('location').value;
    const category = document.getElementById('category').value;
    const poststatus = document.getElementById('poststatus').value;
    const note = document.getElementById('note').value;
    const fileInput = document.getElementById('file');
    const file = fileInput.files[0]; 

    const formData = new FormData();
      formData.append('title', title);
      formData.append('detail', detail);
      formData.append('location', location);
      formData.append('file', file);
      formData.append('category', category);
      formData.append('poststatus', poststatus);
      formData.append('note', note);

    try {
      if (title && detail) {
        await useAxios.post('/posts/addnews', formData);

        Swal.fire({
            title: "กรอกข้อมูลสำเร็จ",
            icon: "success",
            confirmButtonText: "ตกลง",
        }).then((result) => {
            if (result.isConfirmed) {
                location.reload();
            }
        });
    } else {
        Swal.fire({
            title: "กรอกข้อมูลให้ครบถ้วน",
            icon: "warning",
            confirmButtonText: "ตกลง",
        });
    }
    } catch (error) { console.error('Error:', error); }
  };

  return (
    <div className="p-4 sm:ml-64" > 
      <h1 className="mb-1">เพิ่มรายการแจ้งเหตุ</h1>
      <form className="pt-4 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700">
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">หัวเรื่อง (หัวข้อ)</label>
          <input type="text" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="หัวข้อ" required/>
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">รายละเอียด</label>
          <textarea id="detail" rows="4" className="mb-4 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="รายละเอียด"></textarea>
        </div>
        
        <div className="grid mt-2 mb-4 gap-6 md:grid-cols-2">
          <div className=''>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">หมวดหมู่</label>
            <select id="category" defaultValue="" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option value="" disabled>เลือกหมวดหมู่</option>
              <option value="แจ้งเหตุ">รายการแจ้งเหตุ</option>
              <option value="ของหาย">รายการของหาย</option>
              <option value="ตามหา">รายการตามหาเจ้าของ</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">สถานที่</label>
            <select defaultValue="" id="location" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
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
            <select id="poststatus" defaultValue="" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option value="" disabled>เลือกสถานะ</option>
              <option value="กำลังดำเนินการ">กำลังดำเนินการ</option>
              <option value="กำลังตามหา">กำลังตามหา</option>
              <option value="เสร็จสิ้น">เสร็จสิ้น</option>
            </select>        
          </div>

          <div className='mb-4'>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">หมายเหตุ</label>
              <input type="text" id="note" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="หมายเหตุ"/>
          </div>
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">อัพโหลไฟล์รูปภาพ</label>
          <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file" type="file" onChange={handleImageChange}/>
          <p className="mt-1 mb-6 text-sm text-gray-500 dark:text-gray-300">PNG or JPG (800x400px).</p>
        </div>

        {selectedImage && (
            <img src={URL.createObjectURL(selectedImage)} alt="Selected" width="150" height="150" />
          )}

        <div className="flex items-start mb-6">
          <div className="flex items-center h-5">
            <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required />
          </div>
          <label className="mb-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">ตรวจสอบแล้วว่าข้อมูลที่กรอกทั้งหมดมีความ<a className="text-blue-600 hover:underline dark:text-blue-500">ถูกต้อง</a></label>
        </div>

        <button type="submit" className="text-white bg-customBlue hover:bg-customYellow focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handleSubmit} required>บันทึก</button>
      </form>
    </div>
  )
}

export default AddIncidence