import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Navigation from './Navigation';
import { deleteReservation, fetchReservations } from '../redux/reservations/reservationsSlice';

const MyReservation = () => {
  const isLoading = useSelector((state) => state.reservations.isLoading);
  const error = useSelector((state) => state.reservations.error);
  const reservations = useSelector((state) => state.reservations.reservations);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchReservationsData = async () => {
      await dispatch(fetchReservations());
    };

    fetchReservationsData();
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteReservation(id)).then(() => {
      dispatch(fetchReservations());
    });
  };

  return (
    <>
      <div className="flex flex-row h-[100dvh] justify-center md:w-[100dvw] md:flex md:flex-row">
        <div className="md:flex md:w-[15%]">
          <Navigation />
        </div>
        <div className=" flex flex-col md:w-5/6 bg-white  text-gray-700 dark:text-gray-800 p-4 w-full md:pr-16 pr-0 gap-8">
          <h1 className="md:text-center md:text-slate-800 text-4xl md:text-6xl md:font-bold  font-bold text-center md:font-['Inter'] md:leading-[72px]">My Appointments</h1>
          { isLoading && <div>Loading...</div> }
          { error && (
          <div>
            Error:
            {error}
          </div>
          ) }
          {reservations?.length === 0 ? (
            <p>No reservations found.</p>
          ) : (
            <div className="flex flex-col">
              <table className="w-full text-sm table-auto">
                <thead className="text-xs bg-primary main-bg-dark dark:bg-secondary dark:text-gray-800">
                  <tr>
                    <th className="text-start text-base px-2 md:px-6 py-2 hidden md:block">Doctor</th>
                    <th className="text-start text-base px-2 md:px-6 py-2">Date of appointment</th>
                    <th className="text-start text-base px-2 md:px-6 py-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {reservations?.map((reservation) => (
                    <tr key={reservation.id} className="bg-white border-b dark:border-gray-300">
                      <td aria-label="dsa" className="text-gray-600 px-2 md:px-6 py-2 font-medium hidden md:block">{reservation.doctor.name}</td>
                      <td className="text-gray-600 px-2 md:px-6 py-2">{reservation.date_of_reservation}</td>
                      <td className="text-gray-600 px-2 md:px-6 py-2">
                        <Button variant="outlined" color="error" type="button" onClick={() => handleDelete(reservation.id)}>
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

export default MyReservation;
