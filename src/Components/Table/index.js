import React, { useContext, useEffect } from 'react';
import { MyContext } from '../../Context';

export default function Table() {
  // const [renderState, setRenderState] = useState();
  const { searchInput, setSearchInput } = useContext(MyContext);
  useEffect(() => {
    setSearchInput(searchInput);
  }, [searchInput, setSearchInput]);
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Naame</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        {searchInput && (
          <tbody>
            {
              searchInput.map((planet) => (
                <tr key={ planet.name }>
                  <td data-testid="planet-name">{ planet.name }</td>
                  <td>{ planet.rotation_period }</td>
                  <td>{ planet.orbital_period }</td>
                  <td>{ planet.diameter }</td>
                  <td>{ planet.climate }</td>
                  <td>{ planet.gravity }</td>
                  <td>{ planet.terrain }</td>
                  <td>{ planet.surface_water }</td>
                  <td>{ planet.population }</td>
                  <td>
                    { planet.films
                      .map((film, index) => (<p key={ index }>{ film }</p>)) }
                  </td>
                  <td>{ planet.created }</td>
                  <td>{ planet.edited }</td>
                  <td>{ planet.url }</td>
                </tr>
              ))
            }
          </tbody>
        ) }
      </table>
    </div>
  );
}
