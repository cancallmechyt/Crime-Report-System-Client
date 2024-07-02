import CountMember from "../Statistics/Count/CountMember.jsx";
import CountPolice from "../Statistics/Count/CountPolice.jsx";
import CountAccount from "../Statistics/Count/CountAccount.jsx";
import CollegeChart from "../Statistics/PieChart/CollegeChart.jsx";
import "../Statistics/PieChart/location.scss";

function ListMember() {
  return (
    <div className="p-4 sm:ml-64">
      <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
        <div
          className="grid grid-cols-2 gap-4 mb-4"
          style={{ gridTemplateColumns: "20% 80%" }}
        >
          {/* 20% */}
          <div className="flex flex-col items-center justify-center h-30 rounded bg-gray-50 dark:bg-gray-800 overflow-hidden">
            <div
              className="grid grid-cols-1 gap-4 w-full p-4"
              style={{ gridTemplateRows: "1fr 1fr 1fr" }}
            >
              <div className="flex items-center justify-center h-44 rounded bg-gray-100 dark:bg-gray-700">
                {/* COLUM 1 */}
                <div>
                  <CountAccount />
                </div>
              </div>
              <div className="flex items-center justify-center h-44 rounded bg-gray-100 dark:bg-gray-700">
                {/* COLUM 2 */}
                <div>
                  <CountMember />
                </div>
              </div>
              <div className="flex items-center justify-center h-44 rounded bg-gray-100 dark:bg-gray-700">
                {/* COLUM 3 */}
                <div>
                  <CountPolice />
                </div>
              </div>
            </div>
          </div>
          {/* 80% */}
          <div className="flex items-center justify-center h-30 rounded bg-gray-50 dark:bg-gray-800 overflow-hidden">
            <div>
              <CollegeChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListMember;
