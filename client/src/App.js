import React, { Fragment, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';
import Alert from './components/layout/Alert';

import {Provider} from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import CreateGateway from './components/gateway-forms/CreateGateway';
import CreateSensor from './components/sensor-forms/CreateSensor';
import Sensor from './components/dashboard/Sensor';


const  App =()=> {
 
    useEffect(()=>{
      if(localStorage.token)
        setAuthToken(localStorage.token);
        
      store.dispatch(loadUser())
    },[]);;
    return(
      <Provider store={store}>
        <Router>
          <Navbar />
          <Alert/>
          <Routes>
            <Route path="/" element={<Landing/>} />
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route path="dashboard" element={<PrivateRoute component={Dashboard} />}/>
            <Route path="sensor/:gatewayid" element={<PrivateRoute component={Sensor} />}/>
            <Route path="create-gateway" element={<PrivateRoute component={CreateGateway} />}/>
            <Route path="create-sensor/:gatewayid" element={<PrivateRoute component={CreateSensor} />}/>
          </Routes>
        </Router>
      </Provider>
    )};

export default App;
