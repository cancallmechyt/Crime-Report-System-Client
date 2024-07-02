import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useAxios from "../../useAxios";
import moment from "moment";
import dayjs from "dayjs";
dayjs.locale("th");

function StaffHome() {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const response = await useAxios.get("/posts/category/ของหาย");
        const posts = response.data.map((post) => {
          const dateObject = post.date;
          const formattedDate = dayjs(dateObject).format("DD MMM YYYY");

          return {
            ...post,
            Date: formattedDate,
          };
        });
        setData(posts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchAPI();
  }, []);

  const images = ["./pic01.jpg", "./pic02.jpg", "./pic03.jpg"];

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 15000);

    return () => clearInterval(interval);
  }, [currentImage]);

  const prevImage = () => {
    setCurrentImage(currentImage === 0 ? images.length - 1 : currentImage - 1);
  };

  const nextImage = () => {
    setCurrentImage(currentImage === images.length - 1 ? 0 : currentImage + 1);
  };

  return (
    <div className="mt-12 bg-gray-90">
      <div className="relative">
        <img src={images[currentImage]} className="w-full" />
        <div className="absolute inset-y-0 left-0 flex items-center justify-center">
          <button
            onClick={prevImage}
            className="bg-black bg-opacity-25 text-white p-2 rounded-full"
          >
            &lt;
          </button>
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center justify-center">
          <button
            onClick={nextImage}
            className="bg-black bg-opacity-25 text-white p-2 rounded-full"
          >
            &gt;
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="min-h-screen min-w-screen bg-gray-100 p-4 pb-16">
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
              placeholder="หัวข้อ / สถานที่ / เวลา "
              onChange={(e) => setQuery(e.target.value)}
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
            <button
              type="submit"
              className="text-white absolute end-2.5 bottom-2.5 bg-customBlue hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-customBlue dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              ค้นหา
            </button>
          </div>
        </form>

        {/* Box */}
        <div className="mt-4">
          <div className="grid grid-cols-4 gap-4">
            <div className="p-4 rounded-lg text-xs bg-customBlue hover:bg-customYellow text-white text-center flex items-center justify-center">
              <Link to="/emergency">
                <img src="./06.png" alt="Logo" className="h-10 w-10 mx-auto" />
                <p className="mt-1">แจ้งเหตุฉุกเฉิน</p>
              </Link>
            </div>
            <div className="p-4 rounded-lg text-xs bg-customBlue hover:bg-customYellow text-white text-center flex items-center justify-center">
              <Link to="/checklist">
                <img src="./05.png" alt="Logo" className="h-10 w-10 mx-auto" />
                <p className="mt-1">รับแจ้งเหตุ</p>
              </Link>
            </div>
            <div className="p-4 rounded-lg text-xs bg-customBlue hover:bg-customYellow text-white text-center flex items-center justify-center">
              <Link to="/lostitem">
                <img src="./01.png" alt="Logo" className="h-10 w-10 mx-auto" />
                <p className="mt-1"> รายการของหาย</p>
              </Link>
            </div>
            <div className="p-4 rounded-lg text-xs bg-customBlue hover:bg-customYellow text-white text-center flex items-center justify-center">
              <Link to="/checkfinditem">
                <img src="./09.png" alt="Logo" className="h-10 w-10 mx-auto" />
                <p className="mt-1"> ตามหาเจ้าของ</p>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex items-center justify-center font-bold text-xl">
            • รายการของหายล่าสุด •
          </div>
          {data
            .filter(
              (val) =>
                val.title.toLowerCase().includes(query.toLowerCase()) ||
                val.location.toLowerCase().includes(query.toLowerCase()) ||
                val.Date.toLowerCase().includes(query.toLowerCase()) ||
                moment(val.time, "HH:mm")
                  .format("HH:mm")
                  .includes(query.toLowerCase())
            )
            .sort((a, b) => new Date(b.Date) - new Date(a.Date))
            .slice(0, 5)
            .map((val, index) => (
              <div
                key={val.pid}
                className={`bg-gray-50 mt-1 w-full md:w-2/3 xl:w-2/4 p-6 flex flex-col ${
                  index !== 0 ? "border-t-2 border-gray-200 pt-6" : ""
                } border rounded-md`}
              >
                <Link to={`/posts/${val.pid}`} className="flex items-center">
                  <img
                    src={val.imageUrl}
                    alt={val.title}
                    className="w-20 h-20 rounded-md mr-4"
                  />
                  <div className="flex flex-col">
                    <h2 className="ml-0.5 font-bold">{val.title}</h2>
                    <div className="flex items-center">
                      <img className="w-4 h-4" src={"/public/marker.svg"} />
                      <p className="ml-2">{"สถานที่ : " + val.location}</p>
                    </div>
                    <div className="flex items-center">
                      <img className="w-4 h-4 " src={"/public/clock.svg"} />
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
      </div>
    </div>
  );
}

export default StaffHome;
