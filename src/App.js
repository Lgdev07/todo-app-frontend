import React from 'react';
import Routes from './routes'
import logo from './assets/logo.png'
import './App.css'

function App() {
  return (
    <div className="container">
      <img src={logo} alt="Todo Logo"/>
      <p id="title">Todo App</p>
      <div className="content">
      <Routes />
      </div>
    </div>
  );
}

export default App;
