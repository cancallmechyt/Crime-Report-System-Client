import { useEffect, useState } from "react";
import useAxios from "../../../useAxios";
import { Link } from "react-router-dom";

const CountAccount = () => {
  const [value, setValue] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const memberdata = await useAxios.get('/members/all');
        setValue(memberdata.data); 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="CountAccount">
      <div className="flex items-center justify-center">
        <img 
        className="w-7 h-7 text-yellow-500" 
        src={"/public/users.svg"} alt=""/>
        <h1 className="text-xl ml-2">ผู้ใช้ทั้งหมด</h1>
      </div>
      <Link to="/admin/member">
        <div className="flex items-center justify-center mt-5">
          <h2 className="text-4xl mb-2 text-orange-500 font-bold">{value.length}</h2>
            <p className="text-l ml-2">บัญชี</p>
        </div>
      </Link>
      <div className="flex items-center justify-center mt-2">
        <Link to="/admin/member">
          <p className="text-xs text-gray-500">ดูรายละเอียด</p>
        </Link>
      </div>
    </div>
  );
}

export default CountAccount;
