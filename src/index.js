import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import WelcomePage from './pages/welcomePage';
import LoginForm from './pages/loginform';
import CustomerInfoPage from './pages/customerinfo';
import Signup from './pages/signupPage';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        {/* when adding a new page add here follow the layout below  */}
        <Route path='/' element={<App />}></Route>
        <Route path="/rainmanland/calendar/src/pages/welcomePage.js" element={<WelcomePage />}></Route>
        <Route path="/rainmanland/calendar/src/pages/loginform.js" element={<LoginForm />}></Route>
        <Route path="/rainmanland/calendar/src/pages/signupPage.js" element={<Signup />}></Route>
        <Route path='/rainmanland/calendar/src/pages/customerinfo.js' element={<CustomerInfoPage />}></Route> 
      </Routes>
      </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
