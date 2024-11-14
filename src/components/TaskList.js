// src/components/TaskList.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeTask, toggleTask, setPriority } from '../redux/taskSlice';
import { fetchWeather } from '../redux/weatherSlice';
import './TaskList.css';

function TaskList() {
  const tasks = useSelector((state) => state.tasks.tasks);
  const { weatherData, loading, error } = useSelector((state) => state.weather);
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch weather info for tasks related to outdoor activities
    if (tasks && tasks.length > 0) {
      tasks.forEach((task) => {
        if (task.isOutdoorActivity && task.location) {
          dispatch(fetchWeather(task.location));
        }
      });
    }
  }, [dispatch, tasks]);

  if (!Array.isArray(tasks)) {
    console.error('tasks is not an array:', tasks);
    return <div>Error: tasks is not an array</div>;
  }

  return (
    <div className="task-list">
      {loading && <p>Loading weather data...</p>}
      {error && <p>{error}</p>}
      {weatherData && (
        <div className="weather-info">
          <h4>Weather Info:</h4>
          <p>{weatherData.name}: {weatherData.weather[0].description}</p>
          <p>Temperature: {Math.round(weatherData.main.temp - 273.15)}°C</p>
        </div>
      )}
      {tasks.length === 0 ? (
        <p>No tasks available</p>
      ) : (
        tasks.map((task) => (
          <div key={task.id} className="task-item">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => dispatch(toggleTask(task.id))}
            />
            <span className={task.completed ? 'completed' : ''}>
              {task.name} - <strong>{task.priority}</strong>
            </span>
            <button onClick={() => dispatch(removeTask(task.id))}>Delete</button>
            <select
              value={task.priority}
              onChange={(e) => dispatch(setPriority({ id: task.id, priority: e.target.value }))}
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        ))
      )}
    </div>
  );
}

export default TaskList;
