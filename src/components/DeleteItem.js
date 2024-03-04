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
          {doctors?.length === 0 ? (
            <p>No doctors found.</p>
          ) : (
            <div className="flex flex-col">
              <table className="w-full text-sm table-auto">
                <thead className="text-xs bg-primary main-bg-dark dark:bg-secondary dark:text-gray-800">
                  <tr>
                    <th className="text-start text-base px-2 md:px-6 py-2 hidden md:block">Image</th>
                    <th className="text-start text-base px-2 md:px-6 py-2">Name</th>
                    <th className="text-start text-base px-2 md:px-6 py-2">Specialty</th>
                    <th className="text-start text-base px-2 md:px-6 py-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {doctors?.map((doctor) => (
                    <tr key={doctor.id} className="bg-white border-b dark:border-gray-300">
                      <td aria-label="dsa" className="text-gray-600 px-2 md:px-6 py-2 font-medium hidden md:block"><img className="w-8 h-8 rounded-full" src={doctor.image_url} alt="" /></td>
                      <td className="text-gray-600 px-2 md:px-0 py-2">{doctor.name}</td>
                      <td className="text-gray-600 px-2 md:px-6 py-2">{doctor.doctor_type}</td>
                      <td className="text-gray-600 px-2 md:px-6 py-2">
                        <Button variant="outlined" color="error" type="button" onClick={() => handleDelete(doctor.id)}>
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DeleteItem;
