// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './taskSlice';
import authReducer from './authSlice';
import weatherReducer from './weatherSlice';  // Import the new weatherSlice

const store = configureStore({
  reducer: {
    tasks: taskReducer,  // Existing task reducer
    auth: authReducer,    // Existing auth reducer
    weather: weatherReducer,  // Add the new weather reducer here
  },
});

export default store;
