export default async function fetchPlanetes() {
  const endPointURL = 'https://swapi-trybe.herokuapp.com/api/planets/';
  const response = await fetch(endPointURL);
  try {
    const data = await response.json();
    return data;
  } catch (ERROR) {
    return ERROR;
  }
}

export async function fetchPlanetesForSorted() {
  const endPointURL = 'https://swapi-trybe.herokuapp.com/api/planets/';
  const response = await fetch(endPointURL);
  try {
    const data = await response.json();
    return data;
  } catch (E) {
    return E;
  }
}
