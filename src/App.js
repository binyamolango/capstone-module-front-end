import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { useSelector } from 'react-redux';
import Item from './components/Item';
import AddItem from './components/AddItem';
import DeleteItem from './components/DeleteItem';
import AddReservation from './components/AddReservation';
import MyReservation from './components/MyReservation';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';

function App() {
  const reduxStateFromLocalStorage = localStorage.getItem('reduxState');
  const initialReduxState = reduxStateFromLocalStorage
    ? JSON.parse(reduxStateFromLocalStorage) : null;
  const session = useSelector((state) => state.sessions.createSessionMsg);
  const loggedIn = initialReduxState
    ? initialReduxState.sessions.createSessionMsg.logged_in : session.logged_in;

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {loggedIn ? (
            <>
              <Route path="/" element={<Item />} />
              <Route path="/adddoctor" element={<AddItem />} />
              <Route path="/deletedoctor" element={<DeleteItem />} />
              <Route path="/bookappointment" element={<AddReservation />} />
              <Route path="/myappointments" element={<MyReservation />} />
            </>
          ) : (
            <>
              <Route path="/" element={<LogIn />} />
              <Route path="/signup" element={<SignUp />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
