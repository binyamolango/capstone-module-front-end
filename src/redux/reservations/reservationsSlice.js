import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const url = 'http://localhost:3000/api/v1/reservations';

// Create Reservation
const createReservation = createAsyncThunk('reservations/createReservation', async (data) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
    };
    const response = await fetch(url, {
      headers,
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    return { error: error.message };
  }
});

// List Reservations
const fetchReservations = createAsyncThunk('reservations/fetchReservations', async () => {
  try {
    const headers = {
      'Content-Type': 'application/json',
    };
    const response = await fetch(url, {
      headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return { error: error.message };
  }
});

// get reservation by id
const fetchReservation = createAsyncThunk('reservations/fetchReservation', async (id) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
    };

    const response = await fetch(`${url}/${id}`, {
      headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return { error: error.message };
  }
});

// Delete reservation by id
const deleteReservation = createAsyncThunk('reservations/deleteReservation', async (id) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
    };

    const response = await fetch(`${url}/${id}`, {
      method: 'DELETE',
      headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    return { error: error.message };
  }
});

const initialState = {
  isLoading: false,
  reservations: [],
  reservation: {},
  docDeleteMsg: {},
  createReservationMsg: {},
  error: undefined,
};

const reservationSlice = createSlice({
  name: 'reservations',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(createReservation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createReservation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.createReservationMsg = action.payload;
      })
      .addCase(createReservation.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchReservations.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchReservations.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reservations = action.payload;
      })
      .addCase(fetchReservations.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchReservation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchReservation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reservation = action.payload;
      })
      .addCase(fetchReservation.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(deleteReservation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteReservation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.docDeleteMsg = action.payload;
      })
      .addCase(deleteReservation.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },

});

export {
  createReservation, fetchReservations, fetchReservation, deleteReservation,
};
export default reservationSlice.reducer;
