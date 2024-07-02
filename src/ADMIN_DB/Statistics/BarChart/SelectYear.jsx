import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import useAxios from "../../../useAxios";

function SelectYear() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [value0, setValue0] = useState([]);
  const [value1, setValue1] = useState([]);
  const [value2, setValue2] = useState([]);
  const [value3, setValue3] = useState([]);
  const [value4, setValue4] = useState([]);
  const [value5, setValue5] = useState([]);
  const [value6, setValue6] = useState([]);
  const [value7, setValue7] = useState([]);
  const [value8, setValue8] = useState([]);
  const [value9, setValue9] = useState([]);
  const [value10, setValue10] = useState([]);
  const [value11, setValue11] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responses = await Promise.all(
          ["แจ้งเหตุ", "ของหาย", "ตามหาของ", "เหตุฉุกเฉิน"].map(
            async (category) => {
              return await Promise.all(
                Array.from({ length: 12 }, (_, index) =>
                  useAxios
                    .get(
                      `/chartincidence/countcategoryofyear/${year}/${category}/${
                        index + 1
                      }`
                    )
                    .then((response) => response.data)
                )
              );
            }
          )
        );

        const value1Array = responses.map((pair) => pair[0]);
        const value2Array = responses.map((pair) => pair[1]);
        const value3Array = responses.map((pair) => pair[2]);
        const value4Array = responses.map((pair) => pair[3]);
        const value5Array = responses.map((pair) => pair[4]);
        const value6Array = responses.map((pair) => pair[5]);
        const value7Array = responses.map((pair) => pair[6]);
        const value8Array = responses.map((pair) => pair[7]);
        const value9Array = responses.map((pair) => pair[8]);
        const value10Array = responses.map((pair) => pair[9]);
        const value11Array = responses.map((pair) => pair[10]);
        const value12Array = responses.map((pair) => pair[11]);

        setValue0(value1Array);
        setValue1(value2Array);
        setValue2(value3Array);
        setValue3(value4Array);
        setValue4(value5Array);
        setValue5(value6Array);
        setValue6(value7Array);
        setValue7(value8Array);
        setValue8(value9Array);
        setValue9(value10Array);
        setValue10(value11Array);
        setValue11(value12Array);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [year]); // Add `year` as a dependency here

  const data = [
    {
      name: "มกราคม",
      แจ้งเหตุ: value0[0],
      ของหาย: value0[1],
      ตามหาของ: value0[2],
      เหตุฉุกเฉิน: value0[3],
    },
    {
      name: "กุมภาพันธ์",
      แจ้งเหตุ: value1[0],
      ของหาย: value1[1],
      ตามหาของ: value1[2],
      เหตุฉุกเฉิน: value1[3],
    },
    {
      name: "มีนาคม",
      แจ้งเหตุ: value2[0],
      ของหาย: value2[1],
      ตามหาของ: value2[2],
      เหตุฉุกเฉิน: value2[3],
    },
    {
      name: "เมษายน",
      แจ้งเหตุ: value3[0],
      ของหาย: value3[1],
      ตามหาของ: value3[2],
      เหตุฉุกเฉิน: value3[3],
    },
    {
      name: "พฤภาคม",
      แจ้งเหตุ: value4[0],
      ของหาย: value4[1],
      ตามหาของ: value4[2],
      เหตุฉุกเฉิน: value4[3],
    },
    {
      name: "มิถุนายน",
      แจ้งเหตุ: value5[0],
      ของหาย: value5[1],
      ตามหาของ: value5[2],
      เหตุฉุกเฉิน: value5[3],
    },
    {
      name: "กรกฎาคม",
      แจ้งเหตุ: value6[0],
      ของหาย: value6[1],
      ตามหาของ: value6[2],
      เหตุฉุกเฉิน: value6[3],
    },
    {
      name: "สิงหาคม",
      แจ้งเหตุ: value7[0],
      ของหาย: value7[1],
      ตามหาของ: value7[2],
      เหตุฉุกเฉิน: value7[3],
    },
    {
      name: "กันยายน",
      แจ้งเหตุ: value8[0],
      ของหาย: value8[1],
      ตามหาของ: value8[2],
      เหตุฉุกเฉิน: value8[3],
    },
    {
      name: "ตุลาคม",
      แจ้งเหตุ: value9[0],
      ของหาย: value9[1],
      ตามหาของ: value9[2],
      เหตุฉุกเฉิน: value9[3],
    },
    {
      name: "พฤศจิกายน",
      แจ้งเหตุ: value10[0],
      ของหาย: value10[1],
      ตามหาของ: value10[2],
      เหตุฉุกเฉิน: value10[3],
    },
    {
      name: "ธันวาคม",
      แจ้งเหตุ: value11[0],
      ของหาย: value11[1],
      ตามหาของ: value11[2],
      เหตุฉุกเฉิน: value11[3],
    },
  ];

  return (
    <div>
      <p className="text-xl text-center mb-4">สถิติการแจ้งเหตุภายในปีนี้</p>
      <select
        id="yearSelector"
        className="text-gray-500 bg-white border border-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:focus:ring-gray-700"
        value={year}
        onChange={(e) => setYear(Number(e.target.value))}
      >
        <option value={2564}>2564</option>
        <option value={2565}>2565</option>
        <option value={2566}>2566</option>
        <option value={2567}>2567</option>
      </select>
      <BarChart
        width={900}
        height={300}
        data={data}
        margin={{
          top: 2,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <Tooltip
          contentStyle={{ background: "#f9fafb", borderRadius: "1px" }}
          labelStyle={{ display: "none" }}
          cursor={{ fill: "none" }}
        />
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="name"
          interval={0}
          tick={{ fill: "#000000", fontSize: 14 }}
        />
        <YAxis />
        <Legend />
        <Bar dataKey="แจ้งเหตุ" fill="#FF8042" barSize={15} />
        <Bar dataKey="ของหาย" fill="#0088FE" barSize={15} />
        <Bar dataKey="ตามหาของ" fill="#00C49F" barSize={15} />
        <Bar dataKey="เหตุฉุกเฉิน" fill="#FFBB28" barSize={15} />
      </BarChart>
    </div>
  );
}

export default SelectYear;
