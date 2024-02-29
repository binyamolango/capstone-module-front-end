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

    </>
  );
};

export default Item;
