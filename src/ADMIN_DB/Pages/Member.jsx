import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAxios from "../../useAxios";
import Swal from "sweetalert2";

function Member() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOption, setSelectedOption] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(100);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const filteredData = data
    .filter(
      (item) =>
        item.fname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.lname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.college.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.major.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.usercode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.uid.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((item) => {
      if (selectedOption === "all") return true;
      if (selectedOption === "admin") return item.Role === "admin";
      if (selectedOption === "police") return item.Role === "police";
      if (selectedOption === "user") return item.Role === "user";
    });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await useAxios.get("/members/all");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (item) => {
    try {
      Swal.fire({
        title: "ต้องการลบรายการใช่หรือไม่",
        text: `${item.usercode} ${item.fname} ${item.lname}`,
        showCancelButton: true,
        confirmButtonText: "ลบ",
        confirmButtonColor: "#E72929",
        cancelButtonText: "ยกเลิก",
        denyButtonText: `Don't save`,
      }).then(async (result) => {
        if (result.isConfirmed) {
          await useAxios.delete(`/members/delete/${item.uid}`);
          Swal.fire("ลบแล้ว!", "", "success").then(() => {
            window.location.reload();
          });
        } else if (result.isDenied) {
          Swal.fire("ไม่ได้บันทึกการเปลี่ยนแปลง", "", "info");
        }
      });
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการลบโพสต์:", error);
    }
  };

  return (
    <div className="p-4 sm:ml-64">
      {/* <h1 className="ml-2 text-2xl text-gray-900 dark:text-white">รายการแจ้งเหตุทั้งหมดภายในระบบ</h1> */}
      <div className="flex justify-center items-center">
        <h1 className="text-xl font-medium text-gray-900 font-bold mr-1 mb-2">
          แสดงสมาชิกทั้งหมดภายในระบบ{" "}
        </h1>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="flex justify-between">
          <div className="ml-2 mt-3">
            <select
              id="dropdownRadioButton"
              className="text-gray-500 bg-white border border-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:focus:ring-gray-700"
              onChange={handleSelectChange}
            >
              <option value="all">บทบาททั้งหมด</option>
              <option value="admin">ผู้ดูแล</option>
              <option value="police">เจ้าหน้าที่</option>
              <option value="user">สมาชิก</option>
            </select>
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="mr-2 mt-2 w-5 h-5 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                ></path>
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
              <th scope="col" className="px-6 py-3">
                ลำดับที่
              </th>
              <th scope="col" className="px-6 py-3">
                รหัสนักศึกษา
              </th>
              <th scope="col" className="px-6 py-3">
                ชื่อ-สกุล
              </th>
              <th scope="col" className="px-6 py-3">
                คณะ/วิทยาลัย
              </th>
              <th scope="col" className="px-6 py-3">
                สาขาวิชา
              </th>
              <th scope="col" className="px-6 py-3">
                อีเมล
              </th>
              <th scope="col" className="px-6 py-3">
                บทบาท
              </th>
              <th scope="col" className="px-6 py-3">
                ฟังก์ชัน
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems.slice(0, 100).map((item, index) => (
              <tr
                key={index}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="px-6 py-4">{index + 1}</td>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item.usercode}
                </th>
                <td className="px-6 py-4">
                  {item.fname} {item.lname}
                </td>
                <td className="px-6 py-4">{item.college}</td>
                <td className="px-6 py-4">{item.major}</td>
                <td className="px-6 py-4">{item.email}</td>
                <td className="px-6 py-4">{item.role}</td>
                <td className="px-6 py-4">
                  <Link
                    to={`/admin/single/member/${item.uid}`}
                    className="font-medium text-green-600 dark:text-blue-500 hover:underline mr-2"
                  >
                    View
                  </Link>
                  <Link
                    to={`/admin/member/edit/${item.uid}`}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-2"
                  >
                    Edit
                  </Link>
                  <a
                    onClick={() => handleDelete(item)}
                    className="font-medium text-red-600 dark:text-red-500 hover:underline"
                  >
                    Delete
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <nav
          className="mb-4 flex items-center flex-column flex-wrap md:flex-row justify-between pt-4"
          aria-label="Table navigation"
        >
          <span className="ml-2 text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
            Showing{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              {indexOfFirstItem + 1}-{indexOfLastItem}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              {filteredData.length}
            </span>
          </span>
          <ul className="mr-2 inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
            <li>
              <a
                onClick={() => {
                  if (currentPage !== 1) paginate(currentPage - 1);
                }}
                className={`flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                  currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
                }`}
              >
                Previous
              </a>
            </li>
            {Array.from(
              { length: Math.ceil(filteredData.length / itemsPerPage) },
              (_, index) => (
                <li key={index}>
                  <a
                    onClick={() => paginate(index + 1)}
                    className={`flex items-center justify-center px-3 h-8 leading-tight border border-gray-300 ${
                      currentPage === index + 1
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    }`}
                  >
                    {index + 1}
                  </a>
                </li>
              )
            )}
            <li>
              <a
                onClick={() => {
                  if (currentPage < totalPages) paginate(currentPage + 1);
                }}
                className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                  currentPage >= totalPages
                    ? "cursor-not-allowed opacity-50"
                    : ""
                }`}
              >
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Member;
