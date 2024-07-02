import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";
import { useEffect, useState } from "react";
import useAxios from "../../../useAxios";

const LostItemChart = () => {
    const [value, setValue] = useState([]);  

  useEffect(() => {
    const fetchData = async () => {
        try {
            const responses = await Promise.all([
                'ตึก 1', 'ตึก 2', 'ตึก 3', 'ตึก 4', 'ตึก 5', 'ตึก 6', 'ตึก 7', 'ตึก 8', 'ตึก 9', 'ตึก 10', 'ตึก 11', 'ตึก 12', 'ตึก 13', 'ตึก 14', 'ตึก 15'
            ].map(async location => { 
                const response = await useAxios.get(`/chartbar/incidence/catebylocation/${location}/ของหาย`);
                return response.data;
            }));
            setValue(responses);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    fetchData();
}, []);

const data = [
    { name: "1", จำนวน: value[0], color: "#ff355e" }, 
    { name: "2", จำนวน: value[1], color: "#fd5b78" }, 
    { name: "3", จำนวน: value[2], color: "#ff6037" }, 
    { name: "4", จำนวน: value[3], color: "#ff9966" },
    { name: "5", จำนวน: value[4], color: "#ff9933" },
    { name: "6", จำนวน: value[5], color: "#ffcc33" },
    { name: "7", จำนวน: value[6], color: "#ffff66" },
    { name: "8", จำนวน: value[7], color: "#ccff00" },
    { name: "9", จำนวน: value[8], color: "#66ff66" },
    { name: "10", จำนวน: value[9], color: "#aaf0d1" },
    { name: "11", จำนวน: value[10], color: "#16d0cb" }, 
    { name: "12", จำนวน: value[11], color: "#50bfe6" },
    { name: "13", จำนวน: value[12], color: "#9c27b0" },
    { name: "14", จำนวน: value[13], color: "#ee34d2" },
    { name: "15", จำนวน: value[14], color: "#ff00cc" },
];    

  return (
    <div className="ml-1 mr-2 barChartBox">
    <h1 className="text-l text-center font-bold ">สถิติสถานที่หมวดหมู่ของหาย</h1>
    <div className="chart">
        <ResponsiveContainer width="101%" height={90}>
            <BarChart data={data}>
                <Tooltip 
                    contentStyle={{ background: "#f9fafb", borderRadius: "6px" }} 
                    labelStyle={{ display: "none" }} 
                    cursor={{fill:"none"}}
                />
                <CartesianGrid strokeDasharray="3 3" />
                <Bar dataKey="จำนวน" fill="#6b7280" barSize={30}>
                    {data.map((entry) => (
                        <Cell key={`cell-${entry.id}`} fill={entry.color} />
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

export default LostItemChart;
