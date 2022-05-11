import React from 'react';
import './App.css';
import Routes from './Routes/index.routes';
import MyProvider from './Context';

function App() {
  return (
    <MyProvider>
      <Routes />
    </MyProvider>
  );
}

export default App;
