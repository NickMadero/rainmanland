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
import LoginForm from './pages/loginform';

function App() {
  return (
    <div >
        <LoginForm></LoginForm>
      
    </div>
   
  );
}

export default App;
