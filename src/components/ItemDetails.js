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
      <div className="flex flex-col justify-between md:w-fit w-[100dvw] self-end p-2 md:pr-8 pb-12 h-[70%]">
        <div className="flex flex-col gap-2 items-end">
          <h1 className="text-slate-800 md:text-4xl text-xl md:font-bold md:font-['Inter'] md:leading-[72px] md:text-right">{doctor.name}</h1>
          <h2 className="w-[383px] text-right text-gray-400 text-xl font-normal font-['Inter'] leading-[44px]">{doctor.doctor_type}</h2>
          <h3 className="w-[383px] text-right text-gray-400 text-sm font-normal font-['Inter'] leading-[44px]">{doctor.address}</h3>
        </div>
        <button
          className="p-4 text-white bg-blue-400 rounded-r-[80px] rounded-l-[80px]"
          type="button"
          aria-label="Next"
          onClick={handleAppointment}
        >
          Book Appointment
        </button>
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
