import { useEffect, useState } from "react";
import { Cell, Pie, PieChart } from "recharts";
import useAxios from "../../../useAxios";

function CollegeChart() {
    const [value, setValue] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responses = await Promise.all([
                    'admin', 'บุคลากร','เจ้าหน้าที่ตำรวจ', 'นวัตกรรมดิจิทัลเทคโนโลยี', 'ศิลปศาสตร์','แพทยศาสตร์', 'เภสัชศาสตร์', 'วิศวกรรมศาสตร์', 'สถาปัตยกรรมศาสตร์', 'บัญชี', 
                    'นิเทศศาสตร์', 'นิติศาสตร์', 'วิทยาลัยดนตรี', 'สถาบันการบิน', 'เศรษฐศาสตร์'
                ].map(async college => {
                    const response = await useAxios.get(`/chartbar/member/coll/${college}`);
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
        { name: "ผู้ดูแลระบบ", value: value[0], color: "#ff355e" }, 
        { name: "บุคลากร", value: value[1], color: "#fd5b78" }, 
        { name: "เจ้าหน้าที่ตำรวจ", value: value[2], color: "#ff6037" }, 
        { name: "นวัตกรรมดิจิทัลเทคโนโลยี", value: value[3], color: "#ff9966" },
        { name: "ศิลปศาสตร์", value: value[4], color: "#ff9933" },
        { name: "แพทยศาสตร์", value: value[5], color: "#ffcc33" },
        { name: "เภสัชศาสตร์", value: value[6], color: "#ffff66" },
        { name: "วิศวกรรมศาสตร์", value: value[7], color: "#ccff00" },
        { name: "สถาปัตยกรรมศาสตร์", value: value[8], color: "#66ff66" },
        { name: "บัญชี", value: value[9], color: "#aaf0d1" },
        { name: "นิเทศศาสตร์", value: value[10], color: "#16d0cb" }, 
        { name: "นิติศาสตร์", value: value[11], color: "#50bfe6" },
        { name: "วิทยาลัยดนตรี", value: value[12], color: "#9c27b0" },
        { name: "สถาบันการบิน", value: value[13], color: "#ee34d2" },
        { name: "เศรษฐศาสตร์", value: value[14], color: "#ff00cc" },
    ];

    const filteredData = data.filter(item => item.value !== 0);
  
    const renderCustomizedLabel = ({ x, y, value }) => {
        return <text x={x} y={y} fill="#000" textAnchor="middle" dy={5}>{value}</text>;
    };
    
    return (
        <div style={{ display: 'flex' }}>
            <div className="mt-16">
                <PieChart width={400} height={400}>
                    <Pie
                        data={filteredData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={150}
                        label={renderCustomizedLabel}
                        fill="#8884d8"
                        dataKey="value">
                        {filteredData.map((item) => (
                            <Cell key={item.name} fill={item.color} />
                        ))}
                    </Pie>
                </PieChart>
            </div>    
            <div>
                <p className="ml-4 flex items-center justify-center text-2xl font-bold">จำนวนสมาชิกของแต่ละคณะ</p>
                <div className="options-container flex flex-col justify-end mr-5">
                    {filteredData.map((item) => (
                        <div className="option flex items-center" key={item.name}>
                            <div className="ml-4 title">
                                <div className="dot" style={{ backgroundColor: item.color }} />
                                <span>{item.name} : </span>
                            </div>
                            <span className="text-black">{item.value}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default CollegeChart;
