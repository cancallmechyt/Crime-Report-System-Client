import { useEffect, useState } from "react";
import useAxios from "../../../useAxios";
import { Link } from "react-router-dom";

const CountPost = () => {
  const [value, setValue] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postdata = await useAxios.get("/posts/all");
        setValue(postdata.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="CountAccount">
      <div className="flex items-center justify-center">
        <img
          className="w-7 h-7 text-yellow-500"
          src={"/public/document.svg"}
          alt=""
        />
        <h1 className="text-xl ml-2">รายการทั้งหมด</h1>
      </div>
      <Link to="/admin/member">
        <div className="flex items-center justify-center mt-5">
          <h2 className="text-4xl mb-2 text-blue-500 font-bold">
            {value.length}
          </h2>
          <p className="text-l ml-2">รายการ</p>
        </div>
      </Link>
      <div className="flex items-center justify-center mt-2">
        <Link to="/admin/incidence">
          <p className="text-xs text-gray-500">ดูรายละเอียด</p>
        </Link>
      </div>
    </div>
  );
};

export default CountPost;
