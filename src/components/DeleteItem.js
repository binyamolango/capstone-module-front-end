import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import Navigation from './Navigation';
import { fetchDoctors, deleteDoctor } from '../redux/doctors/doctorsSlice';

const DeleteItem = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.doctors.isLoading);
  const error = useSelector((state) => state.doctors.error);
  const doctors = useSelector((state) => state.doctors.doctors);

  useEffect(() => {
    dispatch(fetchDoctors());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteDoctor(id)).then(() => {
      dispatch(fetchDoctors());
    });
  };

  return (
  <>
    <div className="flex flex-row h-[100dvh] justify-center md:w-[100dvw] md:flex md:flex-row">
      <div className="md:flex md:w-[15%]">
        <Navigation />
      </div>
      <div className=" flex flex-col md:w-5/6 bg-white  text-gray-700 dark:text-gray-800 p-4 w-full md:pr-16 pr-0 gap-8">
      <h1 className="md:text-center md:text-slate-800 text-4xl md:text-6xl md:font-bold  font-bold text-center md:font-['Inter'] md:leading-[72px]">Delete Doctors</h1>
          { isLoading && <div>Loading...</div> }
          { error && (
          <div>
            Error:
            {error}
          </div>
          ) }
      </div>
    </div>
  </>
)};

export default DeleteItem;
