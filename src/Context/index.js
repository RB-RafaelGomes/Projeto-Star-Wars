import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import fetchPlanetes from '../services';

export const MyContext = createContext();

export default function MyProvider({ children }) {
  const [planets, setPlanets] = useState('');

  async function getPlatenets() {
    const data = await fetchPlanetes();
    if (data) {
      setPlanets(data);
    }
  }

  const contextValue = {
    planets,
  };
  useEffect(() => {
    getPlatenets();
  }, []);
  return (
    <MyContext.Provider value={ contextValue }>
      {children}
      {console.log(planets)}
    </MyContext.Provider>
  );
}

MyProvider.propTypes = {
  children: PropTypes.string,
}.isRequired;
