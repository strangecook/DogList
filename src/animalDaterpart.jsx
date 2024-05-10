import React, { useState, useEffect } from 'react';
import axios from 'axios';

axios.defaults.baseURL = 'https://api.thecatapi.com/v1';
axios.defaults.headers.common['x-api-key'] = 'live_g6mKCRLIMjqREeQqgoy0cqJ7QyAEzC6R8HoSkWLREMZAGzGFQJHCxl2Sk4vQbqLY';

const animalDaterpart = () => {
  const [images, setImages] = useState([]);
  const [breeds, setBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState(0);

  const getBreeds = async () => {
    const res = await axios('/breeds');
    setBreeds(res.data);
  };

  const getCatsImagesByBreed = async (breedId, amount) => {
    const res = await axios(`/images/search?breed_ids=${breedId}&limit=${amount}`);
    return res.data;
  };

  const loadBreedImages = async () => {
    console.log('Load Breed Images:', selectedBreed);
    const breedImages = await getCatsImagesByBreed(selectedBreed, 5);
    setImages(breedImages);
  };

  const onBreedSelectChange = async (e) => {
    console.log("Breed Selected. ID:", e.target.value);
    await setSelectedBreed(e.target.value);
    await loadBreedImages();
  };

  useEffect(() => {
    if (breeds.length === 0) {
      getBreeds().catch(error => {
        console.error(error);
      });
    }
  }, [breeds]);

  console.log(images)

  return (
    <div>
      <select value={selectedBreed} onChange={onBreedSelectChange}>
        {breeds.map((breed) => (
          <option key={breed.id} value={breed.id}>
            {breed.name}
          </option>
        ))}
      </select>

      <div>
        {images.map((image, index) => (
          <img key={index} className="cat-image" alt="" src={image.url} />
        ))}
      </div>
    </div>
  );
};

export default animalDaterpart;