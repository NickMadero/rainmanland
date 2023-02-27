import logo from './logo.svg';
import './App.css';
import React  from 'react';
import {
  Router,
  Routes,
  Route,
  NavLink,
  Navigate,
  useNavigate,
  Redirect,
} from "react-router-dom";
import WelcomePage from './pages/welcomePage';

function App() {
  return (
    <div >
      
       <WelcomePage />
      
    </div>
   
  );
}

export default App;
