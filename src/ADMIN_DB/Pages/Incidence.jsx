import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAxios from '../../useAxios';
import Swal from 'sweetalert2';
import dayjs from 'dayjs';
import 'dayjs/locale/th';
import moment from 'moment';

dayjs.locale('th');

function Incidence() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTime, setSelectedTime] = useState('alltime');
  const [selectedOption, setSelectedOption] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('allstatus');
  const [selectedBuild, setSelectedBuild] = useState('allbuild');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(100);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [profile, setProfile] = useState([]);
  const [UID, setUID] = useState([]);

  const handleButtonClick = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSelectTime = (e) => {
    setSelectedTime(e.target.value);
  };

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleSelectStatus = (e) => {
    setSelectedStatus(e.target.value);
  };

  const handleSelectBuild = (e) => {
    setSelectedBuild(e.target.value);
  };

  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.detail.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.usercode.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.time.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.date.toLowerCase().includes(searchTerm.toLowerCase())
  ).filter(item => {
    if (selectedOption === 'all') return true;
    if (selectedOption === 'report') return item.category === 'แจ้งเหตุ';
    if (selectedOption === 'lost') return item.category === 'ของหาย';
    if (selectedOption === 'found') return item.category === 'ตามหาของ';
    if (selectedOption === 'emergency') return item.category === 'เหตุฉุกเฉิน';
    if (selectedOption === 'activity') return item.category === 'กิจกรรม';
  }).filter(item => {
    if (selectedStatus === 'allstatus') return true;
    if (selectedStatus === 'wait') return item.poststatus === 'กำลังดำเนินการ';
    if (selectedStatus === 'find') return item.poststatus === 'กำลังตามหา';
    if (selectedStatus === 'com') return item.poststatus === 'เสร็จสิ้น';
  }).filter(item => {
    if (selectedBuild === 'allbuild') return true;
    if (selectedBuild === 'bu1') return item.location === 'ตึก 1';
    if (selectedBuild === 'bu2') return item.location === 'ตึก 2';
    if (selectedBuild === 'bu3') return item.location === 'ตึก 3';
    if (selectedBuild === 'bu4') return item.location === 'ตึก 4';
    if (selectedBuild === 'bu5') return item.location === 'ตึก 5';
    if (selectedBuild === 'bu6') return item.location === 'ตึก 6';
    if (selectedBuild === 'bu7') return item.location === 'ตึก 7';
    if (selectedBuild === 'bu8') return item.location === 'ตึก 8';
    if (selectedBuild === 'bu9') return item.location === 'ตึก 9';
    if (selectedBuild === 'bu10') return item.location === 'ตึก 10';
    if (selectedBuild === 'bu11') return item.location === 'ตึก 11';
    if (selectedBuild === 'bu12') return item.location === 'ตึก 12';
    if (selectedBuild === 'bu13') return item.location === 'ตึก 13';
    if (selectedBuild === 'bu14') return item.location === 'ตึก 14';
    if (selectedBuild === 'bu15') return item.location === 'ตึก 15';   
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalItems = filteredData.length; 
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const fetchData = async () => {
    try {
      let response;
      if (selectedTime === 'new') {
        response = await useAxios.get('/posts/neworder');
      } else if (selectedTime === 'old') {
        response = await useAxios.get('/posts/all');
        
      } else {
        response = await useAxios.get('/posts/all');
      }
  
      const posts = await Promise.all(response.data.map(async (post) => {
        const dateObject = post.date;
        const userDataResponse = await useAxios.get(`/members/${post.uid}`);
        const Profile = userDataResponse.data && userDataResponse.data[0] ? userDataResponse.data[0].usercode : '';
        const formattedDate = dayjs(dateObject).format('DD MMM YYYY');
  
        return {
          ...post,
          Date: formattedDate,
          UserCode: Profile,
        };
      }));
  
      setData(posts);
  
      if (posts.length > 0) {
        const userinfo = await useAxios.get(`/members/${posts[0].uid}`);
        setProfile(userinfo.data);
        setUID(userinfo.data.uid);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, [selectedTime]);

  const handleDelete = async (item) => {
    try {
        Swal.fire({
            title: "ต้องการลบรายการใช่หรือไม่",
            text: `รายการ ${item.title}`, 
            showCancelButton: true,
            confirmButtonText: "ลบ",
            confirmButtonColor: "#E72929",
            cancelButtonText: "ยกเลิก", 
            denyButtonText: `Don't save`
        }).then(async (result) => {
            if (result.isConfirmed) {
                await useAxios.delete(`/posts/${item.pid}`);
                Swal.fire("ลบแล้ว!", "", "success").then(() => {
                    window.location.reload();
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
    <div className="p-4 sm:ml-64">
      <div className='flex justify-center items-center'>
        <h1 className='text-xl font-medium text-gray-900 font-bold mr-1 mb-2'>รายการแจ้งเหตุทั้งหมดภายในระบบ </h1>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="flex justify-between">
          <div className='flex flex-row'>
          <div className="ml-2 mt-3">
            <select id="dropdownRadioButton" className="text-gray-500 bg-white border border-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:focus:ring-gray-700" 
            onChange={handleSelectTime}>
              <option value="alltime">ทั้งหมด</option>
              <option value="new">ล่าสุด</option>
              <option value="old">เก่าสุด</option>
            </select> 
          </div>

          <div className="ml-2 mt-3">
            <select id="dropdownRadioButton" className="text-gray-500 bg-white border border-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:focus:ring-gray-700" 
            onChange={handleSelectStatus}>
              <option value="allstatus">สถานะทั้งหมด</option>
              <option value="wait">กำลังดำเนินการ</option>
              <option value="find">กำลังตามหา</option>
              <option value="com">เสร็จสิ้น</option>
            </select> 
          </div>

          <div className="ml-2 mt-3">
            <select id="dropdownRadioButton" className="text-gray-500 bg-white border border-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:focus:ring-gray-700" 
            onChange={handleSelectChange}>
              <option value="all">รายการทั้งหมด</option>
              <option value="report">รายการแจ้งเหตุ</option>
              <option value="lost">รายการของหาย</option>
              <option value="found">รายการตามหาของ</option>
              <option value="emergency">รายการเหตุฉุกเฉิน</option>
              <option value="activity">รายการกิจกรรม</option>
            </select> 
          </div>

          <div className="ml-2 mt-3">
            <select id="dropdownRadioButton" className="text-gray-500 bg-white border border-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:focus:ring-gray-700" 
            onChange={handleSelectBuild}>
              <option value="allbuild">สถานที่ทั้งหมด</option>
              <option value="bu1">ตึก 1</option>
              <option value="bu2">ตึก 2</option>
              <option value="bu3">ตึก 3</option>
              <option value="bu4">ตึก 4</option>
              <option value="bu5">ตึก 5</option>
              <option value="bu6">ตึก 6</option>
              <option value="bu7">ตึก 7</option>
              <option value="bu8">ตึก 8</option>
              <option value="bu9">ตึก 9</option>
              <option value="bu10">ตึก 10</option>
              <option value="bu11">ตึก 11</option>
              <option value="bu12">ตึก 12</option>
              <option value="bu13">ตึก 13</option>
              <option value="bu14">ตึก 14</option>
              <option value="bu15">ตึก 15</option>
            </select> 
          </div>

          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
              <svg className="mr-2 mt-2 w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
              </svg>
            </div>
            <input
              type="text"
              id="table-search"
              className="mr-2 mt-2 block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="ค้นหารายการที่ต้องการ"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>

        </div>

        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-4">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">ลำดับที่</th>
            <th scope="col" className="px-6 py-3">หัวเรื่อง</th>
            <th scope="col" className="px-6 py-3">หมวดหมู่</th>
            <th scope="col" className="px-6 py-3">รายละเอียด</th>
            <th scope="col" className="px-6 py-3">สถานที่</th>
            <th scope="col" className="px-6 py-3">วัน/เดือน/ปี</th>
            <th scope="col" className="px-6 py-3">เวลา</th>
            <th scope="col" className="px-6 py-3">เจ้าของรายการ</th>
            <th scope="col" className="px-6 py-3">สถานะรายการ</th>
            <th scope="col" className="px-6 py-3">ฟังก์ชัน</th>
          </tr>
        </thead>
          <tbody>
            {currentItems.slice(0, 100).map((item, index) => (
              <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="px-6 py-4">{index + 1}</td>                 
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.title}</th>
                  <td className="px-6 py-4">{item.category}</td>
                  <td className="px-6 py-4">{item.detail}</td>
                  <td className="px-6 py-4">{item.location}</td>
                  <td className="px-6 py-4">{item.Date}</td>
                  <td className="px-6 py-4">{moment(item.time, 'HH:mm').format('HH:mm') + " น."}</td>
                  <td className="px-6 py-4">{item.UserCode}</td>
                  <td className="px-6 py-4">{item.poststatus}</td>
                  <td className="px-6 py-4">  
                    <button onClick={() => handleButtonClick (item)} className="font-medium text-green-600 dark:text-blue-500 hover:underline mr-2">View</button>
                    <Link to={`/admin/incidence/edit/${item.pid}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-2">Edit</Link>
                    <button onClick={() => handleDelete(item)} className="font-medium text-red-600 dark:text-red-500 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {/* Pagination */}
        <nav className="mb-4 flex items-center flex-column flex-wrap md:flex-row justify-between pt-4" aria-label="Table navigation">
          <span className="ml-2 text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
            Showing <span className="font-semibold text-gray-900 dark:text-white">{indexOfFirstItem + 1}-{indexOfLastItem}</span> of <span className="font-semibold text-gray-900 dark:text-white">{filteredData.length}</span>
          </span>
          <ul className="mr-2 inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
            <li>
              <a onClick={() => { if(currentPage !== 1) paginate(currentPage - 1); }} 
              className={`flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${currentPage === 1 ? 'cursor-not-allowed opacity-50' : ''}`}>
                Previous
              </a>
            </li>
            {/* Loop through pages */}
            {Array.from({ length: Math.ceil(filteredData.length / itemsPerPage) }, (_, index) => (
              <li key={index}>
                <a onClick={() => paginate(index + 1)} className={`flex items-center justify-center px-3 h-8 leading-tight border border-gray-300 ${currentPage === index + 1 ? 'bg-blue-50 text-blue-600' : 'text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'}`}>{index + 1}</a>
              </li>
            ))}
            <li>
              <a onClick={() => { if(currentPage < totalPages) paginate(currentPage + 1); }} 
                className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${currentPage >= totalPages ? 'cursor-not-allowed opacity-50' : ''}`}>
                Next
              </a>
            </li>
          </ul>
        </nav>
        
      </div>
      
        {/* POPUP VIEW */}
        {isModalOpen && selectedItem && (
          <div id="authentication-modal" className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-lg shadow-lg w-100 max-w-100">
              <div>
                <h1 className="font-bold float-left">ข้อมูลของรายการ</h1>
                <button onClick={() => setIsModalOpen(false)} className="font-bold float-right">X</button><br/>
              </div>
              <div className="mt-2 flex mb-3">
                <div id='Pic' className="max-w-[300px] max-h-[300px] overflow-hidden">
                  <img src={selectedItem.imageUrl} className="object-cover rounded-md w-full h-full" />
                </div>
                <div id='DetailPost' className="ml-4 mr-10">
                  <h1 className="font-bold text-xl text-black">{selectedItem.title}</h1>
                  <div className="mt-1 flex items-center">
                    <p className="mr-2 font-bold text-l text-black">หมวดหมู่ : </p>
                    <h3 className="text-customGrays">{selectedItem.category}</h3>
                  </div>
                  <div className='mt-1'>
                    <p className="text-left text-l font-bold">รายละเอียด</p>
                    <p className="text-customGrays text-left mr-10">{selectedItem.detail}</p>
                  </div>
                  <div className="flex flex-col">
                        <div className="flex items-center mt-1">
                        <img className="w-4 h-4" src={"/public/marker.svg"}/>
                          <p className='ml-2 font-bold'>{"สถานที่ : "}</p>
                          <p className='ml-1 text-customGrays'>{selectedItem.location}</p>
                        </div>
                        <div className="flex items-center mt-1"> 
                        <img className="w-4 h-4" src={"/public/clock.svg"}/>
                          <p className='ml-2 font-bold'>{selectedItem.Date}{" • " + moment(selectedItem.time, 'HH:mm').format('HH:mm') + " น."}</p><br />
                        </div>
                    </div>
                    <div className="flex items-center mt-1">
                      <p className="mr-2 font-bold text-l text-black ">หมายเหตุ : </p>
                    <h3 className="text-customGrays ">{selectedItem.note}</h3>
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
              </div>
              <div className='float-right'>
                <button onClick={() => { window.location.href=`/admin/incidence/edit/${selectedItem.pid}` }} className="text-white mr-1 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                  แก้ไข
                </button>
                <button className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800" type="button" onClick={() => handleDelete(selectedItem)}>
                  ลบ
                </button>
              </div>
            </div>
          </div>
        )}
    </div>
  );
}

export default Incidence;
