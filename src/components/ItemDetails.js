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
