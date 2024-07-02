import { useEffect, useState } from "react";
import { Cell, Pie, PieChart } from "recharts";
import useAxios from "../../../useAxios";
import "./location.scss";

function LocationChart() {
  const [value, setValue] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responses = await Promise.all(
          [
            "ตึก 1",
            "ตึก 2",
            "ตึก 3",
            "ตึก 4",
            "ตึก 5",
            "ตึก 6",
            "ตึก 7",
            "ตึก 8",
            "ตึก 9",
            "ตึก 10",
            "ตึก 11",
            "ตึก 12",
            "ตึก 13",
            "ตึก 14",
            "ตึก 15",
          ].map(async (location) => {
            const response = await useAxios.get(
              `/chartbar/incidence/location/${location}`
            );
            return response.data;
          })
        );
        setValue(responses);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const data = [
    { name: "ตึก1", value: value[0], color: "#ff355e" },
    { name: "ตึก2", value: value[1], color: "#fd5b78" },
    { name: "ตึก3", value: value[2], color: "#ff6037" },
    { name: "ตึก4", value: value[3], color: "#ff9966" },
    { name: "ตึก5", value: value[4], color: "#ff9933" },
    { name: "ตึก6", value: value[5], color: "#ffcc33" },
    { name: "ตึก7", value: value[6], color: "#ffff66" },
    { name: "ตึก8", value: value[7], color: "#ccff00" },
    { name: "ตึก9", value: value[8], color: "#66ff66" },
    { name: "ตึก10", value: value[9], color: "#aaf0d1" },
    { name: "ตึก11", value: value[10], color: "#16d0cb" },
    { name: "ตึก12", value: value[11], color: "#50bfe6" },
    { name: "ตึก13", value: value[12], color: "#9c27b0" },
    { name: "ตึก14", value: value[13], color: "#ee34d2" },
    { name: "ตึก15", value: value[14], color: "#ff00cc" },
  ];

  const filteredData = data.filter((item) => item.value !== 0);

  const renderCustomizedLabel = ({ x, y, value }) => {
    return (
      <text x={x} y={y} fill="#000" textAnchor="middle" dy={-6}>
        {value}
      </text>
    );
  };

  return (
    <div>
      <p className="flex items-center justify-center text-2xl font-bold">
        จำนวนเหตุทั้งหมดในสถานที่
      </p>
      <div style={{ display: "flex" }}>
        <div className="ml-5 mt-16">
          <PieChart width={400} height={400}>
            <Pie
              data={filteredData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={150}
              label={renderCustomizedLabel}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((item) => (
                <Cell key={item.name} fill={item.color} />
              ))}
            </Pie>
          </PieChart>
        </div>
        <div>
          <div className="ml-7 options-container flex flex-col justify-end mr-5">
            {data.map((item) => (
              <div className="option flex items-center" key={item.name}>
                <div className="title">
                  <div
                    className="dot"
                    style={{ backgroundColor: item.color }}
                  />
                  <span>{item.name} : </span>
                </div>
                <span>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LocationChart;
