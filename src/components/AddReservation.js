import {
  Select, MenuItem, CircularProgress,
} from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router';
import Navigation from './Navigation';
import { fetchDoctors } from '../redux/doctors/doctorsSlice';
import { createReservation } from '../redux/reservations/reservationsSlice';
import { fetchUsers } from '../redux/users/usersSlice';

const AddReservation = () => {
  const [date, setDate] = useState('');
  const [doctorSelected, setDoctorSelected] = useState('');
  const [loading, setLoading] = useState(true);
  const doctors = useSelector((state) => state.doctors.doctors);
  const users = useSelector((state) => state.users.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();
  const doctor = state?.doctor ?? null;

  useEffect(() => {
    if (doctor) {
      setDoctorSelected(doctor);
    } else {
      const fetchDoctorsData = async () => {
        try {
          await dispatch(fetchDoctors());
        } finally {
          setLoading(false);
        }
      };

      fetchDoctorsData();
    }
  }, [doctor, dispatch]);

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        await dispatch(fetchUsers());
      } finally {
        setLoading(false);
      }
    };

    fetchUsersData();
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createReservation({
      reservation: {
        date_of_reservation: date,
        user_id: users[0].id,
        doctor_id: doctorSelected.id,
      },
    }));
    navigate('/myappointments');
  };

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
          <div className="flex flex-col md:w-5/6 bg-white  text-gray-700 dark:text-gray-800 p-4 w-full md:pr-16 pr-0 gap-8">
            <div className="flex flex-col h-full justify-center items-center  md:items-end gap-12 md:pr-16 pr-0 w-full">
              <div className="title-center">
                <h1 className="md:text-right md:text-slate-800 text-4xl md:text-6xl md:font-bold  font-bold text-right md:font-['Inter'] md:leading-[72px]">Book Appointment</h1>
              </div>
              <form className="flex items-center flex-col w-full md:flex-row justify-center md:pl-4 gap-6" onSubmit={(e) => handleSubmit(e)}>
                <div className="flex items-center flex-col w-full md:flex-row justify-center md:pl-4 gap-6">
                  <DatePicker
                    className="w-full date__style"
                    placeholderText="Enter Date"
                    selected={date}
                    onChange={(date) => setDate(date)}
                    required
                  />
                  {doctor ? (
                    <Select className="w-full" value={doctorSelected} onChange={(e) => setDoctorSelected(e.target.value)} required displayEmpty>
                      <MenuItem value={doctor}>{doctor.name}</MenuItem>
                    </Select>
                  ) : (
                    <Select className="w-full" value={doctorSelected} onChange={(e) => setDoctorSelected(e.target.value)} required displayEmpty>
                      <MenuItem value="" className="select__doctor" disabled>Select Doctor</MenuItem>
                      {doctors.map((doctor) => (
                        <MenuItem key={doctor.id} value={doctor}>{doctor.name}</MenuItem>
                      ))}
                    </Select>
                  )}
                </div>
              </form>
              <div>
                <button className="p-4 self-end text-white bg-blue-400 rounded-r-[80px] rounded-l-[80px]" type="submit" onClick={(e) => handleSubmit(e)}>Book Appointment</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddReservation;
