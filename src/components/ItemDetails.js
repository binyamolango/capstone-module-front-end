import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';

function ItemDetails({ doctor, backButton }) {
  const navigate = useNavigate();
  if (!doctor) {
    return {};
  }

  const handleAppointment = () => {
    navigate('/bookappointment', { state: { doctor } });
  };

  return (
    <div className="flex justify-between w-full h-full flex-col md:flex-row">
      <div className="flex items-end pb-2 md:pb-12 justify-end">
        <button
          onClick={() => backButton()}
          className="w-[114px] h-[74px] bg-blue-400 rounded-l-[80px] md:rounded-l-[0px] md:rounded-r-[80px]"
          type="button"
          aria-label="Next"
        >
          <ArrowBackIcon className="text-white" />
        </button>
      </div>
      <div className="doc-img flex items-end w-[100dvw] md:w-[80dvw] justify-center">
        <img className="md:max-w-[100%] h-[50dvh]" src={doctor.image_url} alt="doc-img" />
      </div>
    </div>
  );
}

ItemDetails.propTypes = {
  doctor: PropTypes.shape({
    name: PropTypes.string.isRequired,
    doctor_type: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    image_url: PropTypes.string.isRequired,
  }).isRequired,
  backButton: PropTypes.func.isRequired,
};

export default ItemDetails;
