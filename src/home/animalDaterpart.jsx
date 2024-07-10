// src/components/AnimalDaterPart.js
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Container, Card, Grid, SearchBar, SearchButton, SearchBarContainer, AutocompleteList, AutocompleteItem, ConsonantFilterContainer, ConsonantButton } from './animalDaterPartCss';
import DogCard from './dogCard';
import { fetchAndStoreBreeds, getBreedsData } from '../dataPatch/fetchAndStoreBreeds';
import CustomModal from '../component/Modal';
import Filters from '../component/Filters';
import useStore from '../store/useStore';
import { ClipLoader } from 'react-spinners';

const consonants = ["ㄱ", "ㄴ", "ㄷ", "ㄹ", "ㅁ", "ㅂ", "ㅅ", "ㅇ", "ㅈ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"];

const getKoreanConsonant = (char) => {
  const initialConsonants = [
    'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ',
    'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'
  ];
  const charCode = char.charCodeAt(0) - 44032;
  if (charCode < 0 || charCode > 11171) return char;
  const index = Math.floor(charCode / 588);
  return initialConsonants[index];
};

const AnimalDaterPart = () => {
  const [breedsData, setBreedsData] = useState(null);
  const [displayedBreeds, setDisplayedBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { storedFilters, setStoredFilters } = useStore();
  const [filters, setFilters] = useState(storedFilters);
  const [searchQuery, setSearchQuery] = useState('');
  const [autocompleteResults, setAutocompleteResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const observer = useRef();
  const breedsPerPage = 10;
  const [page, setPage] = useState(1);
  const autocompleteRef = useRef(null);
  const [selectedConsonant, setSelectedConsonant] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
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
      setLoading(false);
    };
    fetchData();
  }, []);
  
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleCardClick = (breed) => {
    setSelectedBreed(breed);
    setModalIsOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
    setSelectedBreed(null);
    document.body.style.overflow = 'auto';
  };

  const filterBreeds = useCallback(() => {
    if (!breedsData) return;

    let filtered = Object.values(breedsData);

    if (filters.size !== 'all') {
      filtered = filtered.filter(breed => breed.size === filters.size);
    }
    if (filters.coatType !== 'all') {
      console.log("filters", filters)
      filtered = filtered.filter(breed => breed.coatType.includes(filters.coatType));
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

    if (filters.searchQuery && filters.searchQuery !== '') {
      filtered = filtered.filter(breed => 
        breed.englishName.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        breed.koreanName.toLowerCase().includes(filters.searchQuery.toLowerCase())
      );
    }

    if (selectedConsonant) {
      filtered = filtered.filter(breed => {
        const firstChar = breed.koreanName.charAt(0);
        return getKoreanConsonant(firstChar) === selectedConsonant;
      });
    }

    localStorage.setItem('filteredBreeds', JSON.stringify(filtered));
    setDisplayedBreeds(filtered.slice(0, breedsPerPage * page));
  }, [breedsData, filters, page, selectedConsonant]);

  useEffect(() => {
    filterBreeds();
  }, [filters, breedsData, filterBreeds, page, selectedConsonant]);

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (autocompleteRef.current && !autocompleteRef.current.contains(event.target)) {
        setAutocompleteResults([]);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      setFilters((prevFilters) => ({ ...prevFilters, searchQuery }));
      setPage(1);
      setAutocompleteResults([]);
    }
  };

  const handleSearchButtonClick = () => {
    setFilters((prevFilters) => ({ ...prevFilters, searchQuery }));
    setPage(1);
    setAutocompleteResults([]);
  };

  const handleSearchInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query !== '') {
      const results = Object.values(breedsData).filter(breed =>
        breed.englishName.toLowerCase().includes(query.toLowerCase()) ||
        breed.koreanName.toLowerCase().includes(query.toLowerCase())
      );
      setAutocompleteResults(results.slice(0, 5));
    } else {
      setAutocompleteResults([]);
    }
  };

  const handleConsonantClick = (consonant) => {
    setSelectedConsonant(consonant === selectedConsonant ? null : consonant);
    setPage(1);
  };

  return (
    <Container>
      <h1>Animal Dater Part</h1>
      <ConsonantFilterContainer>
        {consonants.map((consonant, index) => (
          <ConsonantButton
            key={index}
            selected={consonant === selectedConsonant}
            onClick={() => handleConsonantClick(consonant)}
          >
            {consonant}
          </ConsonantButton>
        ))}
      </ConsonantFilterContainer>
      <SearchBarContainer ref={autocompleteRef}>
        <SearchBar
          type="text"
          placeholder="한국어나 영어로 종을 검색하세요"
          value={searchQuery}
          onChange={handleSearchInputChange}
          onKeyPress={handleKeyPress}
        />
        <SearchButton onClick={handleSearchButtonClick}>Search</SearchButton>
        {autocompleteResults.length > 0 && (
          <AutocompleteList>
            {autocompleteResults.map((breed, index) => (
              <AutocompleteItem key={index} onClick={() => {
                setSearchQuery(breed.englishName);
                setAutocompleteResults([]);
              }}>
                {breed.koreanName} ({breed.englishName})
              </AutocompleteItem>
            ))}
          </AutocompleteList>
        )}
      </SearchBarContainer>
      <Filters filters={filters} setFilters={setFilters} />
      <Grid>
        {displayedBreeds.map((breed, index) => (
          <DogCard
            key={index}
            breed={breed}
            onClick={handleCardClick}
            ref={index === displayedBreeds.length - 1 ? lastBreedElementRef : null}
          />
        ))}
        {loading && (
          <>
          <Card style={{height: "300px"}}>
            <ClipLoader color="#4caf50" size={50} />
          </Card>
          <Card style={{height: "300px"}}>
            <ClipLoader color="#4caf50" size={50} />
          </Card>
          <Card style={{height: "300px"}}>
            <ClipLoader color="#4caf50" size={50} />
          </Card>
          </>
          // <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
          //   <ClipLoader color="#4caf50" size={50} />
          // </div>
        )}
      </Grid>
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
