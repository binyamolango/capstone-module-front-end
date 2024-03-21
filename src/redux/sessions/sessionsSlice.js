import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const url = 'http://127.0.0.1:3000/sessions';

const createSession = createAsyncThunk('session/createSession', async (data) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: data }),
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    return { error: error.message };
  }
});

const initialState = {
  isLoading: false,
  createSessionMsg: {},
  error: undefined,
};

const sessionsSlice = createSlice({
  name: 'sessions',
  initialState,
  reducers: {
    clearAuthState: (state) => {
      state.createSessionMsg = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createSession.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createSession.fulfilled, (state, action) => {
        state.isLoading = false;
        state.createSessionMsg = action.payload;
      })
      .addCase(createSession.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },

});

export { createSession };
export default sessionsSlice.reducer;
