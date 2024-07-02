import IncidenctChart from "../Statistics/BarChart/IncidenctChart.jsx";
import FindItemChart from "../Statistics/BarChart/FindItemChart.jsx";
import LostItemChart from "../Statistics/BarChart/LostItemChart.jsx";
import LocationChart from "../Statistics/PieChart/LocationChart.jsx";
import "../Statistics/PieChart/location.scss";

function ListLocation() {
  return (
    <div className="p-4 sm:ml-64">
      <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
        <div
          className="grid grid-cols-2 gap-4 mb-4"
          style={{ gridTemplateColumns: "50% 50%" }}
        >
          {/* 50% */}
          <div className="flex flex-col items-center justify-center h-30 rounded bg-gray-50 dark:bg-gray-800 overflow-hidden">
            <div
              className="grid grid-cols-1 gap-4 w-full p-4"
              style={{ gridTemplateRows: "1fr 1fr 1fr" }}
            >
              <div className="flex items-center justify-center h-44 rounded bg-gray-100 dark:bg-gray-700">
                {/* COLUM 1 */}
                <div>
                  <IncidenctChart />
                </div>
              </div>
              <div className="flex items-center justify-center h-44 rounded bg-gray-100 dark:bg-gray-700">
                {/* COLUM 2 */}
                <div>
                  <LostItemChart />
                </div>
              </div>
              <div className="flex items-center justify-center h-44 rounded bg-gray-100 dark:bg-gray-700">
                {/* COLUM 3 */}
                <div>
                  <FindItemChart />
                </div>
              </div>
            </div>
          </div>
          {/* 50% */}
          <div className="mr-4 flex items-center justify-center h-30 rounded bg-gray-50 dark:bg-gray-800 overflow-hidden">
            <div>
              <LocationChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListLocation;
