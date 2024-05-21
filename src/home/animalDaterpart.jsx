import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [breeds, setBreeds] = useState([]);
  const apiKey = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const response = await axios.get('https://api.thedogapi.com/v1/breeds', {
          headers: {
            'x-api-key': apiKey
          }
        });
        setBreeds(response.data);
      } catch (error) {
        console.error('Error fetching breeds:', error);
      }
    };

    fetchBreeds();
  }, [apiKey]);

  return (
    <div>
      <h1>Dog Breeds</h1>
      <ul>
        {console.log(breeds)}
        {breeds.map(breed => (
          <li key={breed.id}>
            <h2>{breed.name}</h2>
            <p>Bred for: {breed.bred_for}</p>
            <p>Breed group: {breed.breed_group}</p>
            <p>Life span: {breed.life_span}</p>
            <p>Shedding level: {breed.shedding_level}</p>
            <img src={breed.image.url} alt={breed.name} width="200" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
