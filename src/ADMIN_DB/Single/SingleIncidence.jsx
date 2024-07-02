import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'react-router-dom';

function SingleIncidence({ selectedItem, profile, UID }) {
  if (!selectedItem) return null;

  return (
    <div>
      <div className="mt-2 flex mb-3">
        <div id="Pic" className="max-w-[300px] max-h-[300px] overflow-hidden">
          <img
            src={selectedItem.imageUrl}
            alt={selectedItem.Title || 'Image'}
            className="object-cover rounded-md w-full h-full"
          />
        </div>
        <div id="DetailPost" className="ml-4 mr-10">
          <h1 className="font-bold text-xl text-black">{selectedItem.Title}</h1>
          <div className="mt-1 flex items-center">
            <p className="mr-2 font-bold text-l text-black">หมวดหมู่ :</p>
            <h3 className="text-customGrays">{selectedItem.Category}</h3>
          </div>
          <div className="mt-1">
            <p className="text-left text-l font-bold">รายละเอียด</p>
            <p className="text-customGrays text-left mr-10">{selectedItem.Detail}</p>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center mt-1">
              <img className="w-4 h-4" src="http://localhost:5000/posts/pic/marker.png" alt="Location Marker" />
              <p className="ml-2 font-bold">สถานที่ :</p>
              <p className="ml-1 text-customGrays">{selectedItem.Location}</p>
            </div>
            <div className="flex items-center mt-1">
              <img className="w-4 h-4" src="http://localhost:5000/posts/pic/clocks.png" alt="Clock" />
              <p className="ml-2 font-bold">
                {selectedItem.Date}
                {' • ' + moment(selectedItem.Time, 'HH:mm').format('HH:mm') + ' น.'}
              </p>
            </div>
          </div>
          <div className="flex items-center mt-1">
            <p className="mr-2 font-bold text-l text-black">หมายเหตุ :</p>
            <h3 className="text-customGrays">{selectedItem.Note}</h3>
          </div>

          <div className="mt-4 rounded bg-gray-200">
            {profile.map((item, index) => (
              <div key={index} className="flex flex-col">
                <div className="flex items-center">
                  <div className="ml-2 h-10 w-10 rounded-full overflow-hidden bg-customBlue mr-2">
                    <img
                      src="http://localhost:5000/posts/pic/user.png"
                      alt={`${item.Fname} ${item.Lname}`}
                      className="ml-1 items-center h-8 w-8 object-cover mt-1"
                    />
                  </div>
                  <div>
                    <Link to={`/list/${UID}`}>
                      <p className="text-left text-s font-bold">{item.Fname} {item.Lname}</p>
                    </Link>
                    <p className="text-s text-left text-customGrays mr-2 mb-1">คณะ : {item.College}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

SingleIncidence.propTypes = {
  selectedItem: PropTypes.shape({
    imageUrl: PropTypes.string,
    Title: PropTypes.string,
    Category: PropTypes.string,
    Detail: PropTypes.string,
    Location: PropTypes.string,
    Date: PropTypes.string,
    Time: PropTypes.string,
    Note: PropTypes.string,
  }),
  profile: PropTypes.arrayOf(
    PropTypes.shape({
      Fname: PropTypes.string,
      Lname: PropTypes.string,
      College: PropTypes.string,
    })
  ),
  UID: PropTypes.string,
};

export default SingleIncidence;
