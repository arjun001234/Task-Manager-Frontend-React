import React from 'react';
import ReactDOM from 'react-dom';
import { TaskContextProvider } from './useContext'
import App from './App';
import HomePage from './HomePage';
import CompletedTasks from './CompletedTasks'
import Profile from './profile';
import AddTask from './AddTask';


ReactDOM.render(
  <React.StrictMode>
    <TaskContextProvider>
    <App />
    </TaskContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


