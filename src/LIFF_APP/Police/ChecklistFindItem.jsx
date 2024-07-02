import { useState, useEffect } from "react";
import useAxios from "../../useAxios";
import moment from "moment";
import { Link } from "react-router-dom";
import config from "../../config.json";
import dayjs from "dayjs";
dayjs.locale("th");

function CheckFindItem() {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 20;
  const URL = config.URL_BASE;

  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const response = await useAxios.get("/posts/category/ตามหาของ");
        const posts = response.data.map((post) => {
          const dateObject = post.date;
          const formattedDate = dayjs(dateObject).format("DD MMM YYYY");

          return {
            ...post,
            Date: formattedDate,
            StatusColor: setStatusColor(post.PostStatus),
          };
        });

        setData(posts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const setStatusColor = (status) => {
      if (status === "กำลังดำเนินการ") {
        return "text-yellow-500";
      } else if (status === "เสร็จสิ้น") {
        return "text-green-500";
      } else {
        return "text-gray-500";
      }
    };

    fetchAPI();
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = data
    .filter(
      (val) =>
        val.title.toLowerCase().includes(query.toLowerCase()) ||
        val.location.toLowerCase().includes(query.toLowerCase()) ||
        val.category.toLowerCase().includes(query.toLowerCase()) ||
        val.poststatus.toLowerCase().includes(query.toLowerCase()) ||
        val.Date.toLowerCase().includes(query.toLowerCase()) ||
        moment(val.time, "HH:mm").format("HH:mm").includes(query.toLowerCase())
    )
    .sort(
      (a, b) =>
        new Date(b.Date + " " + b.time) - new Date(a.Date + " " + a.time)
    )
    .slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="mt-12 min-h-screen min-w-screen p-2 bg-gray-100 flex flex-col justify-between">
      <div className="bg-gray-100 p-2 pb-12">
        <form className="max-w-md mx-auto">
          <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              id="default-search"
              placeholder="สถานที่ / วัน และ เวลา / อื่นๆ "
              onChange={(e) => setQuery(e.target.value)}
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
            <button
              type="submit"
              className="text-white absolute end-2.5 bottom-2.5 bg-customBlue hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-customBlue dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
        </form>

        <div className="mt-1 flex flex-wrap justify-center">
          {currentPosts.map((val) => (
            <div
              key={val.pid}
              className={`w-full md:w-2/3 xl:w-2/4 p-6 flex flex-col border-b border-gray-200 relative bg-white rounded-lg shadow-md mb-4`}
            >
              <Link
                to={`/posts/editstaff/${val.pid}`}
                className="flex items-center"
              >
                <img
                  src={val.imageUrl}
                  alt={val.title}
                  className="w-24 h-24 rounded-md mr-4"
                />
                <div className="flex flex-col">
                  <h2 className="font-bold">{val.title}</h2>
                  <div className="flex items-center">
                    <img className="w-4 h-4" src={`${URL}marker.png`} />
                    <p className="ml-2">{"สถานที่ : " + val.location}</p>
                  </div>
                  <div className="flex items-center">
                    <img className="w-4 h-4" src={`${URL}clocks.png`} />
                    <p className="ml-2">
                      {val.Date}
                      {" • " +
                        moment(val.time, "HH:mm").format("HH:mm") +
                        " น."}
                    </p>
                    <br />
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Pagination component */}
        <div className="flex justify-center mb-5">
          {data.length > 0 && (
            <ul className="flex space-x-2">
              <li>
                <button
                  onClick={() => paginate(currentPage - 1)}
                  className={`px-3 py-1 rounded-lg ${
                    currentPage === 1
                      ? "bg-customGray text-gray-800 cursor-not-allowed"
                      : "bg-customBlue text-white"
                  }`}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
              </li>
              {Array.from({
                length: Math.ceil(data.length / postsPerPage),
              }).map((_, index) => {
                if (
                  index === 0 ||
                  index === Math.ceil(data.length / postsPerPage) - 1 ||
                  index === currentPage - 1 ||
                  index === currentPage ||
                  index === currentPage + 1
                ) {
                  return (
                    <li key={index}>
                      <button
                        onClick={() => paginate(index + 1)}
                        className={`px-3 py-1 rounded-lg ${
                          currentPage === index + 1
                            ? "bg-customBlue text-white cursor-not-allowed"
                            : "bg-customGray text-gray-800"
                        }`}
                      >
                        {index === currentPage - 4 && index !== 0
                          ? "..."
                          : index + 1}
                      </button>
                    </li>
                  );
                }
                return null;
              })}
              <li>
                <button
                  onClick={() => paginate(currentPage + 1)}
                  className={`px-3 py-1 rounded-lg ${
                    currentPage === Math.ceil(data.length / postsPerPage)
                      ? "bg-customGray text-gray-800 cursor-not-allowed"
                      : "bg-customBlue text-white"
                  }`}
                  disabled={
                    currentPage === Math.ceil(data.length / postsPerPage)
                  }
                >
                  Next
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default CheckFindItem;
