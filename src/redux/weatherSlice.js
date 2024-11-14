// redux/weatherSlice.js
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  weatherData: null,
  loading: false,
  error: null,
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setWeatherData: (state, action) => {
      state.weatherData = action.payload;
      state.loading = false;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setLoading, setWeatherData, setError } = weatherSlice.actions;

// Async action to fetch weather data from an API
export const fetchWeather = (city) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=13187b52614688d022c12aa7bab26900`);
    dispatch(setWeatherData(response.data));
  } catch (error) {
    dispatch(setError('Failed to fetch weather data'));
  }
};

export default weatherSlice.reducer;
