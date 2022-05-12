import React, { useContext } from 'react';
import { MyContext } from '../../Context';

export default function TBody() {
  const { planets } = useContext(MyContext);
  return (
    <tbody>
      {planets.map((e) => (
        <tr key={ e.name }>
          <td>{e.name}</td>
          <td>{e.rotation_period}</td>
          <td>{e.orbital_period}</td>
          <td>{e.diameter}</td>
          <td>{e.climate}</td>
          <td>{e.gravity}</td>
          <td>{e.terrain}</td>
          <td>{e.surface_water}</td>
          <td>{e.population}</td>
          <td>{e.films}</td>
          <td>{e.created}</td>
          <td>{e.edited}</td>
          <td>{e.url}</td>
        </tr>
      ))}
    </tbody>
  );
}
