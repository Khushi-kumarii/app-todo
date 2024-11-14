import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../redux/taskSlice';  // Assuming you have an addTask action in taskSlice
import './TaskInput.css';  // Import the CSS

const TaskInput = () => {
  const [taskName, setTaskName] = useState('');
  const [isOutdoorActivity, setIsOutdoorActivity] = useState(false);
  const [location, setLocation] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskName) {
      dispatch(addTask({ name: taskName, isOutdoorActivity, location }));
      setTaskName('');
      setIsOutdoorActivity(false);
      setLocation('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-input">
      <input
        type="text"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        placeholder="Enter task name"
      />
      <label>
        Is this an outdoor activity?
        <input
          type="checkbox"
          checked={isOutdoorActivity}
          onChange={(e) => setIsOutdoorActivity(e.target.checked)}
        />
      </label>
      {isOutdoorActivity && (
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter location (city)"
        />
      )}
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskInput;
