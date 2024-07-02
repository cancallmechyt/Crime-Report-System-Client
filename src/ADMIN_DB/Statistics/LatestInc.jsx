import useAxios from "../../useAxios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs"; 
dayjs.locale("th");

function LatestInc() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await useAxios.get("/posts/neworder");
        console.log(response.data);
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
    fetchData();
  }, []);

  return (
    <div className="">
      <h1 className="flex justify-center items-start font-bold text-xl text-center">
        รายการล่าสุด
      </h1>
      <div style={{ height: "2px" }}></div>
      <div className="list">
        {data
          .slice(0, 7)
          .sort((a, b) => new Date(b.Date) - new Date(a.Date))
          .slice(0, 6)
          .map((value) => (
            <div
              className="mb-1 listItem bg-white shadow rounded-lg hover:bg-blue-100 transition-colors duration-300"
              key={value.pid}
            >
              <Link to={`/admin/incidence/edit/${value.pid}`}>
                <div className="mt-2 flex items-center">
                  <div className="mr-4">
                    <img
                      className="ml-2 mt-1 w-14 h-14 rounded-full"
                      src={value.imageUrl}
                      alt=""
                    />
                  </div>
                  <div>
                    <div className="flex flex-col">
                      <div className="flex items-center mt-1">
                        <p className="font-bold">{value.title}</p>
                      </div>
                      <div className="flex items-center ">
                        <img className="w-4 h-4" src={"/public/marker.svg"} />
                        <p className="ml-2 ">{"สถานที่ : "}</p>
                        <p className="ml-1 ">{value.location}</p>
                      </div>
                      <div className="flex items-center mb-2">
                        <img className="w-4 h-4" src={"/public/clock.svg"} />
                        <p className="ml-2 mr-2 ">
                          {value.Date}
                          {" • " + value.category}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}

export default LatestInc;
