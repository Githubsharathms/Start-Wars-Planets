const BASE_URL = 'https://swapi.dev/api';

export const fetchPlanets = async (page = 1) => {
  try {
    const response = await fetch(`https://swapi.dev/api/planets/?page=${page}`);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error("Could not fetch planets: ", error);
    throw error; 
  }
};


export const fetchResidentDetails = async (residentUrl) => {
  try {
    const response = await fetch(residentUrl);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error("Could not fetch resident details: ", error);
    throw error; 
  }
};
