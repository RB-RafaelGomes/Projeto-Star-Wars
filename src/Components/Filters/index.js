import React, { useContext } from 'react';
import { MyContext } from '../../Context';

export default function Filters() {
  const { filterByName, setNumericValues, filteredColumns,
    numericValues, filterByBumericValues,
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
    </div>
  );
}
