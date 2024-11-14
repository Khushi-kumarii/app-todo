// components/Sidebar.js
import React from 'react';
import { useDispatch } from 'react-redux';
import { setView } from '../redux/taskSlice';
import './Sidebar.css';

function Sidebar({ user }) {
  const dispatch = useDispatch();

  const handleViewChange = (view) => {
    dispatch(setView(view));
  };

  // Ensure that user exists before trying to extract the name from the email
  const userName = user && user.split('@')[0];  // Extract name from email before @

  return (
    <div className="sidebar">
      {user ? (
        <div className="user-profile">
          {/* Display the user's name above the image */}
          <p className="user-name">{userName}</p>  {/* Name before @gmail.com */}
          <img 
            src="/assets/u3.png"  // Path to image in public folder
            alt="User Avatar" 
            className="avatar" 
          />
          <button onClick={() => dispatch({ type: 'auth/logout' })}>Logout</button>
        </div>
      ) : (
        <p>Guest</p>  // Fallback for when user is not logged in
      )}

      <ul className="menu">
        <li onClick={() => handleViewChange('all')}>All Tasks</li>
        <li onClick={() => handleViewChange('today')}>Today</li>
        <li onClick={() => handleViewChange('important')}>Important</li>
        <li onClick={() => handleViewChange('planned')}>Planned</li>
        <li onClick={() => handleViewChange('assigned')}>Assigned to me</li>
      </ul>
    </div>
  );
}

export default Sidebar;
