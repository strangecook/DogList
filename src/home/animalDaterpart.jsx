import React, { useEffect, useState, useRef, useCallback } from 'react';
import axios from 'axios';
import { Container, Grid } from './animalDaterPartCss';
import DescriptionSection from './DescriptionSection';
import CustomModal from '../component/Modal';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { DogCard } from './dogCard';

const App = () => {
  const [allBreeds, setAllBreeds] = useState([]);
  const [displayedBreeds, setDisplayedBreeds] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedBreed, setSelectedBreed] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const breedsPerPage = 20;

  const fetchDogApiData = async () => {
    try {
      const response = await axios.get('https://api.thedogapi.com/v1/breeds', {
        headers: { 'x-api-key': process.env.REACT_APP_API_KEY }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching dog API data:', error);
      return [];
    }
  };

  const fetchBreeds = useCallback(async () => {
    if (allBreeds.length === 0) {
      setIsFetching(true);
      try {
        const [querySnapshot, dogApiData] = await Promise.all([
          getDocs(collection(db, 'dogs')),
          fetchDogApiData()
        ]);

        const breedsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        const mergedData = breedsData.map(breed => {
          const matchingDogApiData = dogApiData.find(dog => dog.name.toLowerCase() === breed.englishName.toLowerCase());
          return matchingDogApiData ? { ...breed, image: { url: matchingDogApiData.image.url } } : breed;
        });

        setAllBreeds(mergedData);
        setDisplayedBreeds(mergedData.slice(0, breedsPerPage));
      } catch (error) {
        console.error('Error fetching breeds:', error);
      }
      setIsFetching(false);
    }
  }, [allBreeds.length, breedsPerPage]);

  useEffect(() => {
    fetchBreeds();
  }, [fetchBreeds]);

  const loadMoreBreeds = useCallback(() => {
    setIsFetching(true);
    setDisplayedBreeds(prevBreeds => {
      const currentLength = prevBreeds.length;
      const moreBreeds = allBreeds.slice(currentLength, currentLength + breedsPerPage);
      return [...prevBreeds, ...moreBreeds];
    });
    setIsFetching(false);
  }, [allBreeds, breedsPerPage]);

  const observer = useRef();
  const lastBreedElementRef = useCallback(node => {
    if (isFetching) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !isFetching) {
        loadMoreBreeds();
      }
    });
    if (node) observer.current.observe(node);
  }, [isFetching, loadMoreBreeds]);

  const openModal = (breed) => {
    setSelectedBreed(breed);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedBreed(null);
  };

  return (
    <>
      <Container>
        <h1>Dog Breeds</h1>
        <DescriptionSection />
        <Grid>
          {displayedBreeds.map((breed, index) => (
            <DogCard 
              key={breed.id} 
              breed={breed}
              ref={displayedBreeds.length === index + 1 ? lastBreedElementRef : null}
            />
          ))}
        </Grid>
      </Container>
      {selectedBreed && (
        <CustomModal 
          isOpen={modalIsOpen} 
          onRequestClose={closeModal} 
          breed={selectedBreed} 
        />
      )}
      {isFetching && <div>Loading more breeds...</div>}
    </>
  );
};

export default App;
