
//import {createUserRequest,userLoginRequest,readUserRequest} from './requests';
import './style.css';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Login from './Login';
import LandingPage from './LandingPage';
import Register from './Register';
import HomePage from './HomePage';
import React from 'react'
import ProtectedRoute from './ProtectedRoute';
import Unauthorized from './Unauthorized';
import Profile from './profile';
import CompletedTasks from './CompletedTasks';
import AddTask from './AddTask';
import Dashboard from './HomePage';

import {createStore} from 'redux';
import { reducer } from './Redux/reducer';
import {Provider} from 'react-redux';

const initialStore = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
  token: localStorage.getItem('token'),
  errors: null
}

const store = createStore(reducer,initialStore);

function App() {

  return (
    <Provider store={store} >
    <Router>
      <Switch>
        <Route exact path='/' children={<LandingPage />} />
        <Route exact path='/login'  render={props => <Login {...props}    />}  />
        <Route exact path='/register'  render={props => <Register {...props}  />} />
        <ProtectedRoute   exact path='/home' component={HomePage}  />
        <Route exact path='/unauthorized' component={Unauthorized} />
        <ProtectedRoute   exact path='/home/profile' component={Profile}  />
        <ProtectedRoute   exact path='/home/completedTasks' component={CompletedTasks}  />
        <ProtectedRoute   exact path='/home/addTasks' component={AddTask}  />
      </Switch>
    </Router>
    </Provider>
  );
}

export default App;
/**
 * 
 */
