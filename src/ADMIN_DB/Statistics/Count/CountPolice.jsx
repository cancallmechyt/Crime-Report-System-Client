import { useEffect, useState } from "react";
import useAxios from "../../../useAxios";
import { Link } from "react-router-dom";

function CountPolice() {
    const [value, setValue] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await useAxios.get(`/chartbar/member/role/police`);
          setValue(response.data); 
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, []);
  
    return (
      <div className="barChartBox">
        <div className="flex items-center justify-center">
          <img 
          className="w-7 h-7 text-yellow-500" 
          src={"/public/user-police.svg"} alt=""/>
          <h1 className="text-xl ml-2">จำนวนเจ้าหน้าที่</h1>
        </div>
        <Link to="/admin/member">
          <div className="flex items-center justify-center mt-5">
            <h2 className="text-4xl mb-2 text-green-500 font-bold">{value}</h2>
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

export default CountPolice