import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import fetchPlanetes from '../services';

export const MyContext = createContext();

export default function MyProvider({ children }) {
  const [planets, setPlanets] = useState('');
  const [savePlanetsFilter, setSavePlanetsFilter] = useState({
    xablau: 'xablau',
  });
  const [filteredColumns, setFilteredColumns] = useState([]);
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
      setSavePlanetsFilter({ ...savePlanetsFilter,
        [numericValues.column]: searchInput,
      });
      setSearchInput(searchInput.filter((planet) => Number(planet[numericValues.column])
      > Number(numericValues.value)));
      setColumnsFilters(columnsFilters.filter((value) => value !== numericValues.column));
      setFilteredColumns([...filteredColumns, numericValues.column]);
      console.log(savePlanetsFilter);
      console.log(searchInput);
      break;
    case 'igual a':
      setSavePlanetsFilter({ ...savePlanetsFilter,
        [numericValues.column]: searchInput,
      });
      console.log(planets);
      setSearchInput(searchInput.filter((planet) => planet[numericValues.column]
       === numericValues.value));
      setColumnsFilters(columnsFilters.filter((value) => value !== numericValues.column));
      setFilteredColumns([...filteredColumns, numericValues.column]);
      break;
    case 'menor que':
      console.log(planets);
      setSavePlanetsFilter({ ...savePlanetsFilter,
        [numericValues.column]: searchInput,
      });
      setSearchInput(searchInput.filter((planet) => Number(planet[numericValues.column])
       < Number(numericValues.value)));
      setColumnsFilters(columnsFilters.filter((value) => value !== numericValues.column));
      setFilteredColumns([...filteredColumns, numericValues.column]);
      break;
    default:
      setSearchInput(planets);
    }
  };

  const removefilter = ({ target }) => {
    const { name } = target;
    setFilteredColumns(filteredColumns.filter((eachValue) => !eachValue.includes(name)));
    const objInArray = Object.values(savePlanetsFilter[name]);
    const allValues = [...searchInput, ...objInArray];
    // const onlyName = searchInput.map((eachValue) => eachValue.name);
    const filteredArr = allValues.reduce((acc, current) => {
      const x = acc.find((item) => item.name === current.name);
      if (!x) {
        return acc.concat([current]);
      }
      return acc;
    }, []);
    console.log(filteredArr);
    setSearchInput(filteredArr);
  };

  const removeAllFilters = () => {
    setColumnsFilters(
      ['population',
        'orbital_period', 'diameter', 'rotation_period', 'surface_water'],
    );
    setFilteredColumns([]);
    setSearchInput(planets);
  };

  const contextValue = {
    planets,
    searchInput,
    numericValues,
    columnsFilters,
    filteredColumns,
    setFilteredColumns,
    filterByName,
    setNumericValues,
    filterByBumericValues,
    removeAllFilters,
    removefilter,
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
