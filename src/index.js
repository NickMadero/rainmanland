import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import LoginForm from './pages/loginform';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CustomerInfoPage from './pages/customerinfo';
import OwnerHomePage from './pages/ownerhomepage'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        {/* when adding a new page add here follow the layout below  */}
        <Route path='/' element={<App />}></Route>
        <Route path="/rainmanland/calendar/src/pages/loginform.js" element={<LoginForm />}></Route>
        <Route path='/rainmanland/calendar/src/pages/customerinfo.js' element={<CustomerInfoPage />}></Route> 
        <Route path='/rainmanland/calendar/src/pages/ownerhomepage.js' element={<OwnerHomePage />}></Route>
      </Routes>
      </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
