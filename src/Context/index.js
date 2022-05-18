import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import fetchPlanetes from '../services';

export const MyContext = createContext();

export default function MyProvider({ children }) {
  const [planets, setPlanets] = useState('');
  const [columnsFilters, setColumnsFilters] = useState(['population',
    'orbital_period', 'diameter', 'rotation_period', 'surface_water']);
  const [searchInput, setSearchInput] = useState('');
  const [numericValues, setNumericValues] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });

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

  const filterByBumericValues = () => {
    switch (numericValues.comparison) {
    case 'maior que':
      console.log(planets);
      setSearchInput(searchInput.filter((planet) => Number(planet[numericValues.column])
       > Number(numericValues.value)));
      setColumnsFilters(columnsFilters.filter((value) => value !== numericValues.column));
      break;
    case 'igual a':
      console.log(planets);
      setSearchInput(searchInput.filter((planet) => planet[numericValues.column]
       === numericValues.value));
      setColumnsFilters(columnsFilters.filter((value) => value !== numericValues.column));
      break;
    case 'menor que':
      console.log(planets);
      setSearchInput(searchInput.filter((planet) => Number(planet[numericValues.column])
       < Number(numericValues.value)));
      setColumnsFilters(columnsFilters.filter((value) => value !== numericValues.column));
      break;
    default:
      setSearchInput(planets);
    }
  };

  const contextValue = {
    planets,
    searchInput,
    numericValues,
    columnsFilters,
    filterByName,
    setNumericValues,
    filterByBumericValues,
  };
  useEffect(() => {
    getPlatenets();
  }, []);
  return (
    <MyContext.Provider value={ contextValue }>
      {children}
    </MyContext.Provider>
  );
}

MyProvider.propTypes = {
  children: PropTypes.string,
}.isRequired;
