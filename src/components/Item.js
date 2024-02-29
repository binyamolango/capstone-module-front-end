import { CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Navigation from './Navigation';
import { fetchDoctors } from '../redux/doctors/doctorsSlice';
import x from '../images/x.svg';
import ItemDetails from './ItemDetails';

const Item = () => {
  const dispatch = useDispatch();
  const fetchedDoctors = useSelector((state) => state.doctors.doctors);
  const [startIndex, setStartIndex] = useState(0);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchDoctors());
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [dispatch]);

  let displayDoctors = [];
  if (fetchedDoctors && fetchedDoctors.length > 3) {
    displayDoctors = isMobile
      ? fetchedDoctors.slice(startIndex, startIndex + 1)
      : fetchedDoctors.slice(startIndex, startIndex + 3);
  }

  const handleNextClick = () => {
    if (startIndex + (isMobile ? 1 : 3) < fetchedDoctors.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const handlePrevClick = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  const handleDoctorClick = (doctor) => {
    setSelectedDoctor(doctor);
  };

  const handleBackButton = () => {
    setSelectedDoctor(null);
  };

  const hasDoctorsOnLeft = startIndex > 0;
  const hasDoctorsOnRight = startIndex + (isMobile ? 1 : 3) < fetchedDoctors?.length;

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <CircularProgress />
        </div>
      ) : (
        <div className="flex flex-row h-[100dvh] justify-center md:w-[100dvw] md:flex md:flex-row">
          <div className="md:flex md:w-[15%]">
            <Navigation />
          </div>
          <div className="flex flex-col md:w-5/6 w-full bg-white text-gray-700 dark:text-gray-800 p-4 gap-8 justify-center items-center">
            {selectedDoctor ? (
              <ItemDetails doctor={selectedDoctor} backButton={handleBackButton} />
            ) : (
              <>
                <h1 className="text-slate-800 text-4xl font-bold font-['Inter'] leading-[44px] m-8">Our Doctors</h1>

                <div className="flex justify-between w-[100%] md:w-[85%] md:mt-4 md:absolute bottom-0 md:bottom-[40%]">
                  <button
                    className={`arrow__btn w-[114px] h-[74px] rounded-r-[80px] ${hasDoctorsOnLeft ? ' bg-blue-400' : 'bg-gray-300'} `}
                    type="button"
                    onClick={handlePrevClick}
                    disabled={!hasDoctorsOnLeft}
                    aria-label="Previous"
                  >
                    <ArrowBackIcon className="text-white" />
                  </button>

                  <button
                    className={`arrow__btn w-[114px] h-[74px] rounded-l-[80px] ${hasDoctorsOnRight ? ' bg-blue-400' : 'bg-gray-300'}`}
                    type="button"
                    onClick={handleNextClick}
                    disabled={!hasDoctorsOnRight}
                    aria-label="Next"
                  >
                    <ArrowForwardIcon className="text-white" />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Item;
