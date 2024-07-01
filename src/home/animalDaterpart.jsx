// src/components/AnimalDaterPart.js
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Container, Grid } from './animalDaterPartCss';
import DogCard from './dogCard';
import { fetchAndStoreBreeds, getBreedsData } from '../dataPatch/fetchAndStoreBreeds';
import CustomModal from '../component/Modal';
import Filters from '../component/Filters';
import useStore from '../store/useStore';

const AnimalDaterPart = () => {
  const [breedsData, setBreedsData] = useState(null);
  const [displayedBreeds, setDisplayedBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { storedFilters, setStoredFilters } = useStore();
  const [filters, setFilters] = useState(storedFilters);

  const observer = useRef();
  const breedsPerPage = 10;
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const localBreedsData = getBreedsData();
      if (localBreedsData) {
        console.log('Using localStorage data');
        setBreedsData(localBreedsData);
      } else {
        console.log('Fetching new data...');
        await fetchAndStoreBreeds();
        const newBreedsData = getBreedsData();
        setBreedsData(newBreedsData);
      }
    };
    fetchData();
  }, []);

  const handleCardClick = (breed) => {
    setSelectedBreed(breed);
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
    setSelectedBreed(null);
  };

  const filterBreeds = useCallback(() => {
    if (!breedsData) return;

    let filtered = Object.values(breedsData);

    if (filters.size !== 'all') {
      filtered = filtered.filter(breed => breed.size === filters.size);
    }
    if (filters.coatType !== 'all') {
      filtered = filtered.filter(breed => breed.coatType === filters.coatType);
    }
    if (filters.affectionWithFamily !== 'all') {
      filtered = filtered.filter(breed => breed.affectionWithFamily === Number(filters.affectionWithFamily));
    }
    if (filters.goodWithOtherDogs !== 'all') {
      filtered = filtered.filter(breed => breed.goodWithOtherDogs === Number(filters.goodWithOtherDogs));
    }
    if (filters.trainabilityLevel !== 'all') {
      filtered = filtered.filter(breed => breed.trainabilityLevel === Number(filters.trainabilityLevel));
    }
    if (filters.energyLevel !== 'all') {
      filtered = filtered.filter(breed => breed.energyLevel === Number(filters.energyLevel));
    }
    if (filters.sheddingLevel !== 'all') {
      filtered = filtered.filter(breed => breed.sheddingLevel === Number(filters.sheddingLevel));
    }

    localStorage.setItem('filteredBreeds', JSON.stringify(filtered));
    setDisplayedBreeds(filtered.slice(0, breedsPerPage * page));
  }, [breedsData, filters, page]);

  useEffect(() => {
    filterBreeds();
  }, [filters, breedsData, filterBreeds, page]);

  const loadMoreBreeds = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const lastBreedElementRef = useCallback((node) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadMoreBreeds();
      }
    });
    if (node) observer.current.observe(node);
  }, []);

  return (
    <Container>
      <h1>Animal Dater Part</h1>
      <Filters filters={filters} setFilters={setFilters} />
      {displayedBreeds.length > 0 ? (
        <Grid>
          {displayedBreeds.map((breed, index) => (
            <DogCard
              key={index}
              breed={breed}
              onClick={handleCardClick}
              ref={index === displayedBreeds.length - 1 ? lastBreedElementRef : null}
            />
          ))}
        </Grid>
      ) : (
        <p>Loading data...</p>
      )}
      {selectedBreed && (
        <CustomModal
          isOpen={modalIsOpen}
          onRequestClose={handleCloseModal}
          breed={selectedBreed}
        />
      )}
    </Container>
  );
};

export default AnimalDaterPart;
