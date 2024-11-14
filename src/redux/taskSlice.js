// src/redux/taskSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: JSON.parse(localStorage.getItem('tasks')) || [], // Load tasks from localStorage
  view: 'all',
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      const newTask = { ...action.payload, id: Date.now(), priority: 'Medium' }; // Set default priority
      state.tasks.push(newTask);
      localStorage.setItem('tasks', JSON.stringify(state.tasks)); // Save to localStorage
    },
    removeTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      localStorage.setItem('tasks', JSON.stringify(state.tasks)); // Save to localStorage
    },
    toggleTask: (state, action) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
      localStorage.setItem('tasks', JSON.stringify(state.tasks)); // Save to localStorage
    },
    setView: (state, action) => {
      state.view = action.payload;
    },
    setPriority: (state, action) => {
      const { id, priority } = action.payload;
      const task = state.tasks.find((task) => task.id === id);
      if (task) {
        task.priority = priority;
      }
      localStorage.setItem('tasks', JSON.stringify(state.tasks)); // Save to localStorage
    },
  },
});

export const { addTask, removeTask, toggleTask, setView, setPriority } = taskSlice.actions;
export default taskSlice.reducer;
