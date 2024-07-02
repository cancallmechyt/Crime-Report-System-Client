import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useEffect, useState } from "react";
import useAxios from "../../../useAxios";

const AllInc = () => {
  const [value1, setValue1] = useState([]);
  const [value2, setValue2] = useState([]);
  const [value3, setValue3] = useState([]);   
  const [value4, setValue4] = useState([]);  

  useEffect(() => {
    const fetchData = async () => {
        try {
          const response1 = await useAxios.get(`/chartbar/incidence/cate/แจ้งเหตุ`);
          setValue1(response1.data); 
          const response2 = await useAxios.get(`/chartbar/incidence/cate/ของหาย`);
          setValue2(response2.data); 
          const response3 = await useAxios.get(`/chartbar/incidence/cate/ตามหาของ`);
          setValue3(response3.data); 
          const response4 = await useAxios.get(`/chartbar/incidence/cate/เหตุฉุกเฉิน`);
          setValue4(response4.data); 
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

    fetchData();
  }, []);

  const chartData = [
    { name: "แจ้งเหตุ", จำนวน: value1 },
    { name: "ของหาย", จำนวน: value2 },
    { name: "ตามหา", จำนวน: value3 },
    { name: "ฉุกเฉิน", จำนวน: value4 },
  ];

  function getBarColor(name) {
    if (name === "แจ้งเหตุ") {
      return "#FF8042";
    } else if (name === "ของหาย") {
      return "#0088FE";
    } else if (name === "ตามหา") {
      return "#00C49F";
    } else {
      return "#FFBB28";
    }
  }

  return (
    <div className="barChartBox">
    <h1 className="text-l text-center">รายการสรุปทั้งหมด</h1>
    <div className="chart">
      <ResponsiveContainer width="101%" height={90}>
        <BarChart data={chartData}>
          <Tooltip 
            contentStyle={{ background: "#f9fafb", borderRadius: "1px" }} 
            labelStyle={{ display: "none" }} 
            cursor={{fill:"none"}}
          />
          <Bar dataKey="จำนวน" fill="#6b7280" barSize={60}>
            {chartData.map((entry) => (
              <Cell key={`cell-${entry.id}`} fill={getBarColor(entry.name)} />
            ))}
          </Bar>
          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#000", fontSize: 14 }} />
          <YAxis hide={true} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
  );
}

export default AllInc;
