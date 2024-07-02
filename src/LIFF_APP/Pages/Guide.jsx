import { Link } from "react-router-dom";

function Guide() {
  return (
    <div className="mt-12 h-screen text-center bg-gray-200">
      <div className="">
        <img className="w-100 h-100" src="/001.png" />
      </div>

      <div className="py-4 pb-16">
        <div className="ml-2 mr-2 border border-solid border-gray-200 rounded-lg p-4 bg-white">
          <Link to="/form">
            <div className="ml-2 mr-2 flex items-center justify-center">
              <img className="w-12 h-12" src="./g_icon_3.png" alt="image" />
            </div>
          </Link>
          <h1 className="text-xl font-bold">รายการแจ้งเหตุ</h1>
          <p>
            เมื่อพบเจอหรือประสบเหตุอันตรายสามารถแจ้งได้ที่ฟังกชั่นนี้เมื่อเจแล้วจะมีการส่งรายการที่แจ้งไปยังตำรวจมหาวิทยาลัยรังสิตทันที
          </p>
        </div>

        <div className="mt-2 ml-2 mr-2 border border-solid border-gray-200 rounded-lg p-4 bg-white">
          <Link to="/lostitem">
            <div className="ml-2 mr-2 flex items-center justify-center">
              <img className="w-12 h-12" src="./g_icon_2.png" alt="image" />
            </div>
          </Link>
          <h1 className="text-xl font-bold">รายการแจ้งของหาย</h1>
          <p>
            เมื่อทำของหายสามารถลงประกาศเพื่อตามหาของได้ หรือ
            สามารถดูรายการตามหาเจ้าของได้จากหมวดหมู่
          </p>
        </div>

        <div className="mt-2 ml-2 mr-2 border border-solid border-gray-200 rounded-lg p-4 bg-white">
          <div className="ml-2 mr-2 flex items-center justify-center">
            <img className="w-12 h-12" src="./g_icon_1.png" alt="image" />
          </div>
          <h1 className="text-xl font-bold">รับแจ้งเตือนเหตุฉุกเฉิน</h1>
          <p>
            เมื่อเป็นสมาชิกกับทาง LINE OFFICIAL
            จะได้รับการแจ้งเตือนทันทีเมื่อเกิดเหตุฉุกเฉิน
          </p>
        </div>
      </div>
    </div>
  );
}

export default Guide;
