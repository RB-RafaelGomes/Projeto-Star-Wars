import React from 'react';
import Filters from './Components/Filters';
import Table from './Components/Table';
import MyProvider from './Context';

function App() {
  return (
    <MyProvider>
      <Filters />
      <Table />
    </MyProvider>
  );
}

export default App;
