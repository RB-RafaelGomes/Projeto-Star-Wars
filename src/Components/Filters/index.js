import React, { useContext } from 'react';
import { MyContext } from '../../Context';

export default function Filters() {
  const { filterByName, setNumericValues, filteredColumns, SETTHISPLANETS,
    numericValues, filterByBumericValues, allfilters,
    orderSelect, setOrderSelect, handleInputChange,
    columnsFilters, removeAllFilters, removefilter } = useContext(MyContext);

  return (
    <div>
      <input
        type="text"
        data-testid="name-filter"
        onChange={ (e) => filterByName(e) }
      />
      <label htmlFor="column-filter">
        <select
          data-testid="column-filter"
          value={ numericValues.column }
          name="column-filter"
          onChange={ ({ target }) => {
            const { value } = target;
            setNumericValues({
              ...numericValues,
              column: value,
            });
          } }
        >
          {
            columnsFilters.map((value, index) => (
              <option key={ index } value={ value }>{value}</option>
            ))
          }
        </select>
      </label>
      <label htmlFor="comparison-filter">
        <select
          data-testid="comparison-filter"
          value={ String(numericValues.comparison) }
          name="filters"
          onChange={ ({ target }) => {
            const { value } = target;
            setNumericValues({
              ...numericValues,
              comparison: value,
            });
          } }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
      </label>
      <input
        type="number"
        value={ Number(numericValues.value) }
        data-testid="value-filter"
        onChange={ ({ target }) => {
          const { value } = target;
          setNumericValues({
            ...numericValues,
            value,
          });
        } }
      />
      <button
        data-testid="button-filter"
        type="button"
        onClick={ () => filterByBumericValues() }
      >
        Apply
      </button>
      {
        filteredColumns.map((eachValue, index) => (
          <div
            key={ index }
            data-testid="filter"
          >
            {eachValue}
            <button
              key={ index }
              onClick={ (e) => removefilter(e) }
              name={ eachValue }
              type="button"
            >
              x

            </button>
          </div>
        ))
      }
      <div>
        <button
          data-testid="button-remove-filters"
          type="button"
          onClick={ (e) => removeAllFilters(e) }
        >
          REMOVE FILTROS
        </button>
      </div>
      <div>
        <select
          data-testid="column-sort"
          value={ orderSelect }
          name="column-sort"
          onChange={ ({ target }) => {
            const { value } = target;
            setOrderSelect(value);
          } }
        >
          {
            allfilters.map((value, index) => (
              <option
                key={ index }
                value={ value }
              >
                {value}

              </option>
            ))
          }
        </select>
        <label htmlFor="ASC">
          Ascendente
          <input
            data-testid="column-sort-input-asc"
            onChange={ (e) => handleInputChange(e) }
            type="radio"
            name="sortInput"
            value="ASC"
          />
        </label>
        <label htmlFor="DESC">
          Descendente
          <input
            data-testid="column-sort-input-desc"
            onChange={ (e) => handleInputChange(e) }
            type="radio"
            name="sortInput"
            value="DESC"
          />
        </label>
        <button
          data-testid="column-sort-button"
          type="button"
          onClick={ () => SETTHISPLANETS() }
        >
          Order
        </button>
      </div>
    </div>
  );
}
