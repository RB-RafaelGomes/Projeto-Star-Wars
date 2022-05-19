import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { sort, createNewSortInstance } from 'fast-sort';
import fetchPlanetes from '../services';

export const MyContext = createContext();

export default function MyProvider({ children }) {
  // const [randomValue, setRandomValue] = useState('');
  const [sortInputs, setSortInputs] = useState('ASC');
  const [allfilters] = useState(['population',
    'orbital_period', 'diameter', 'rotation_period', 'surface_water']);
  const [orderSelect, setOrderSelect] = useState('population');
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
    // const dataSorte = await fetchPlanetesForSorted();
    if (data) {
      const fullData = sort(data.results).asc((planet) => planet.name);
      setPlanets(fullData);
      setSearchInput(fullData);
    }
  }

  const filterByName = ({ target }) => {
    const { value } = target;
    if (value.length >= 1) {
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
      break;
    case 'igual a':
      setSavePlanetsFilter({ ...savePlanetsFilter,
        [numericValues.column]: searchInput,
      });
      setSearchInput(searchInput.filter((planet) => planet[numericValues.column]
       === numericValues.value));
      setColumnsFilters(columnsFilters.filter((value) => value !== numericValues.column));
      setFilteredColumns([...filteredColumns, numericValues.column]);
      break;
    case 'menor que':
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
    const filteredArr = allValues.reduce((acc, current) => {
      const value = acc.find((item) => item.name === current.name);
      if (!value) {
        return acc.concat([current]);
      }
      return acc;
    }, []);
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

  const SETTHISPLANETS = () => {
    const newSortInstance = createNewSortInstance({
      comparer: new Intl.Collator(undefined, { numeric: true }).compare,
    });

    if (sortInputs === 'ASC') {
      const ascSorted = newSortInstance(planets)
        .asc((planet) => Number(planet[orderSelect]));
      setSearchInput(ascSorted);
    } else if (sortInputs === 'DESC') {
      const descSorted = newSortInstance(planets)
        .desc((planet) => Number(planet[orderSelect]) || 0);
      setSearchInput(descSorted);
    }
  };

  const handleInputChange = ({ target }) => {
    const { value } = target;
    setSortInputs(value);
  };

  const contextValue = {
    planets,
    searchInput,
    numericValues,
    columnsFilters,
    filteredColumns,
    allfilters,
    orderSelect,
    sortInputs,
    setSearchInput,
    SETTHISPLANETS,
    handleInputChange,
    setOrderSelect,
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
