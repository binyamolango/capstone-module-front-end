import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './users/usersSlice';
import doctorsReducer from './doctors/doctorsSlice';
import reservationsReducer from './reservations/reservationsSlice';
import sessionsReducer from './sessions/sessionsSlice';

// Retrieve the persisted state from localStorage
const getPersistedState = () => {
  const persistedState = localStorage.getItem('reduxState');
  return persistedState ? JSON.parse(persistedState) : {};
};

const store = configureStore({
  reducer: {
    users: usersReducer,
    doctors: doctorsReducer,
    reservations: reservationsReducer,
    sessions: sessionsReducer,
  },
  preloadedState: getPersistedState(), // Use the retrieved persisted state
});

store.subscribe(() => {
  localStorage.setItem('reduxState', JSON.stringify(store.getState()));
});

export default store;
