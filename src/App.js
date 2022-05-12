import React from 'react';
import Table from './Components/Table';
import MyProvider from './Context';

function App() {
  return (
    <MyProvider>
      <Table />
    </MyProvider>
  );
}

export default App;
