import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const registerUser = createAsyncThunk('auth/register', async (formdata, { rejectWithValue }) => {
  try {
    const response = await axios.post('http://localhost:5000/register', formdata);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const loginUser = createAsyncThunk('auth/login', async (formdata, {rejectWithValue}) => {
    try {
        const response = await axios.post('http://localhost:5000/login', formdata);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})



const authSlice = createSlice({
  name: 'auth',
  initialState: {
    name: null,
    token: '',
    isAuthenticated: false,
    loading: false,
    error: null,
    phone: '',
    country: '',
    state: '',
    pinCode: '',
    city: '',
    area: '',
    landMark: '',
  },
  reducers: {
    logout(state, action) {
      state.isAuthenticated = false;
      state.token = '';
      state.name = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.name = action.payload.name;
        state.token = action.payload.token;
        state.country = action.payload.country;
        state.state = action.payload.state;
        state.city = action.payload.city;
        state.area = action.payload.area;
        state.phone = action.payload.phone;
        state.landMark = action.payload.landMark;
        state.pinCode = action.payload.pinCode;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.name = action.payload.name;
        state.token = 'dummy-token';
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
