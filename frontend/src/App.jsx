import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './Home'
import Login from './Login'
import Registration from './registration'

import ForgotPassword from './ForgotPassword'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    useNavigate,
    Outlet,
} from "react-router-dom";

function App() {


  return (
    <>
    <Router>
      <Routes>
         <Route path='/'  element={<Login/>}/>
         <Route path='/register'  element={<Registration />}/>
        <Route path='/home'  element={<Home />}/>
        <Route path='/forgotpass'  element={<ForgotPassword />}/>
      </Routes>
    </Router>
      
    </>
  )
}

export default App
