import LatestInc from "../Statistics/LatestInc.jsx"
import CountPost from "../Statistics/Count/CountPost.jsx"
import CountAccount from "../Statistics/Count/CountAccount.jsx"
import CountSucess from "../Statistics/Count/CountSucess.jsx"
import YearInc from "../Statistics/BarChart/YearInc.jsx"

import '../Statistics/PieChart/location.scss';

function Home() {
  return (
    <div className="p-4 sm:ml-64">
      <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
        <div className="grid grid-cols-2 gap-4 mb-4" style={{ gridTemplateColumns: '25% 75%' }}>
          {/* 20% */}
          <div className="flex flex-col items-center justify-center h-30 rounded bg-gray-50 dark:bg-gray-800 overflow-hidden">
            <LatestInc/>
          </div>

          {/* 80% */}
          <div className="flex items-start justify-center h-30 rounded bg-gray-50 dark:bg-gray-800 overflow-hidden mr-4">
            <div className="grid gap-4 w-full p-4" style={{ gridTemplateColumns: '32.5% 32.5% 32.5%', gridTemplateRows: 'auto auto', columnGap: '10px' }}>
              {/* ROW 1 */}
                <div className="flex items-start justify-center h-44 rounded bg-gray-100 dark:bg-gray-700">
                  {/* COLUMN 1 */}
                  <div className="w-full h-full flex items-center justify-center">
                    <CountPost />
                  </div>
                </div>
                <div className="flex items-start justify-center h-44 rounded bg-gray-100 dark:bg-gray-700">
                  {/* COLUMN 2 */}
                  <div className="w-full h-full flex items-center justify-center">
                    <CountAccount />
                  </div>
                </div>
                <div className="flex items-start justify-center h-44 rounded bg-gray-100 dark:bg-gray-700">
                  {/* COLUMN 3 */}
                  <div className="w-full h-full flex items-center justify-center">
                    <CountSucess />
                  </div>
                </div>
              {/* ROW 2 */}
                <div className="grid-cols-2 flex items-start justify-center h-96 rounded bg-gray-100 dark:bg-gray-700 col-span-3">
                  {/* COLUMN 4 */}
                  <div className="h-full flex items-center justify-center">
                    <YearInc/>
                  </div>
                </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Home