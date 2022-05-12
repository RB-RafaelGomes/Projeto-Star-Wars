import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import fetchPlanetes from '../services';

export const MyContext = createContext();

export default function MyProvider({ children }) {
  const [planets, setPlanets] = useState('');
  // const [savePlanets, setSavePlanets] = useState('');
  const [searchInput, setSearchInput] = useState('');

  async function getPlatenets() {
    const data = await fetchPlanetes();
    if (data) {
      setPlanets(data.results);
      setSearchInput(data.results);
    }
  }

  const filterByName = ({ target }) => {
    const { value } = target;
    if (value.length >= 1) {
      console.log(value);
      setSearchInput(planets.filter((planet) => planet.name.includes(value)));
    } else {
      setSearchInput(planets);
    }
  };

  const contextValue = {
    planets,
    filterByName,
    searchInput,
  };
  useEffect(() => {
    getPlatenets();
  }, []);
  return (
    <MyContext.Provider value={ contextValue }>
      {children}
      {console.log(planets.results)}
    </MyContext.Provider>
  );
}

MyProvider.propTypes = {
  children: PropTypes.string,
}.isRequired;
