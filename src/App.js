import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from './redux/authSlice'; // Import login/logout actions
import Sidebar from './components/Sidebar';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import Auth from './components/Auth';
import './styles.css';

const App = () => {
  const isAuthenticated = useSelector((state) => state.auth.isLoggedIn);
  const userFromRedux = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const [user, setUser] = useState(userFromRedux);

  useEffect(() => {
    if (userFromRedux) {
      setUser(userFromRedux);
    }
  }, [userFromRedux]);

  const handleLogin = (email) => {
    console.log('User logged in with email:', email);
    dispatch(login(email));  // Dispatch login action to set user in Redux
    setUser(email);  // Save the email in local state
  };

  const handleLogout = () => {
    dispatch(logout());  // Dispatch logout action to reset user in Redux
    setUser(null);  // Reset local state user
  };

  return (
    <div className="app-container">
      {!isAuthenticated && !user ? (
        <Auth onLogin={handleLogin} />
      ) : (
        <>
          <Sidebar user={user} />
          <div className="main-content">
            <TaskInput />
            <TaskList />
          </div>
          <div>
            <p>Welcome, {user || 'Authenticated User'}</p>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
