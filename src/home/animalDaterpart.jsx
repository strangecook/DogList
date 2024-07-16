// src/AnimalDaterPart.js
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Container, Card, Grid, SearchBar, SearchButton, SearchBarContainer, AutocompleteList, AutocompleteItem, ConsonantFilterContainer, ConsonantButton, ThemeFilterContainer, ThemeButton, FilterInfoContainer, FilterInfo, ResetButton } from './animalDaterPartCss';
import DogCard from './dogCard';
import { fetchAndStoreBreeds, getBreedsData } from '../dataPatch/fetchAndStoreBreeds';
import CustomModal from '../component/Modal';
import Filters from '../component/Filters';
import useStore from '../store/useStore';
import { ClipLoader } from 'react-spinners';

const consonants = ["ㄱ", "ㄴ", "ㄷ", "ㄹ", "ㅁ", "ㅂ", "ㅅ", "ㅇ", "ㅈ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"];
const themes = [
  { id: 1, name: '한국에서 인기있는 반려견' },
  { id: 2, name: '1인가구에 좋은 반려견' },
  { id: 3, name: '초보 견주에게 좋은 반려견' },
  { id: 4, name: '자녀를 가지고 있는 가정에게 좋은 반려견' },
  { id: 5, name: '노부부에게 좋은 반려견' }
];

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
  const [searchInput, setSearchInput] = useState('');
  const [autocompleteResults, setAutocompleteResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const observer = useRef();
  const breedsPerPage = 10;
  const [page, setPage] = useState(1);
  const autocompleteRef = useRef(null);
  const [selectedConsonant, setSelectedConsonant] = useState(null);
  const [selectedTheme, setSelectedTheme] = useState(null);

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
  
    console.log('Current Filters:', filters); // 현재 필터 값 확인
  
    if (filters.size !== 'all') {
      console.log('Filtering by size:', filters.size); // 사이즈 필터 로그
      filtered = filtered.filter(breed => breed.size === filters.size);
    }
    if (filters.breedGroup !== 'all') {
      console.log('Filtering by breedGroup:', filters.breedGroup); // 견종 그룹 필터 로그
      filtered = filtered.filter(breed => {
        console.log('breedGroup:', breed.breedGroup); // breedGroup 값 확인
        return breed.breedGroup && breed.breedGroup.includes(filters.breedGroup);
      });
    }
    if (filters.affectionWithFamily !== 'all') {
      console.log('Filtering by affectionWithFamily:', filters.affectionWithFamily); // 가족과의 애정 필터 로그
      filtered = filtered.filter(breed => breed.affectionWithFamily === Number(filters.affectionWithFamily));
    }
    if (filters.goodWithOtherDogs !== 'all') {
      console.log('Filtering by goodWithOtherDogs:', filters.goodWithOtherDogs); // 다른 개와의 친화력 필터 로그
      filtered = filtered.filter(breed => breed.goodWithOtherDogs === Number(filters.goodWithOtherDogs));
    }
    if (filters.trainabilityLevel !== 'all') {
      console.log('Filtering by trainabilityLevel:', filters.trainabilityLevel); // 훈련 가능성 필터 로그
      filtered = filtered.filter(breed => breed.trainabilityLevel === Number(filters.trainabilityLevel));
    }
    if (filters.energyLevel !== 'all') {
      console.log('Filtering by energyLevel:', filters.energyLevel); // 에너지 수준 필터 로그
      filtered = filtered.filter(breed => breed.energyLevel === Number(filters.energyLevel));
    }
    if (filters.sheddingLevel !== 'all') {
      console.log('Filtering by sheddingLevel:', filters.sheddingLevel); // 털 빠짐 정도 필터 로그
      filtered = filtered.filter(breed => breed.sheddingLevel === Number(filters.sheddingLevel));
    }
  
    if (searchQuery && searchQuery !== '') {
      console.log('Filtering by searchQuery:', searchQuery); // 검색어 필터 로그
      filtered = filtered.filter(breed =>
        breed.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        breed.koreanName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
  
    if (selectedConsonant) {
      console.log('Filtering by selectedConsonant:', selectedConsonant); // 자음 필터 로그
      filtered = filtered.filter(breed => {
        const firstChar = breed.koreanName.charAt(0);
        return getKoreanConsonant(firstChar) === selectedConsonant;
      });
    }
  
    if (selectedTheme) {
      console.log('Filtering by selectedTheme:', selectedTheme); // 테마 필터 로그
      filtered = filtered.filter(breed => breed.theme && breed.theme.includes(selectedTheme));
    }
  
    console.log('Filtered Breeds:', filtered); // 필터링된 결과 확인
  
    localStorage.setItem('filteredBreeds', JSON.stringify(filtered));
    setDisplayedBreeds(filtered.slice(0, breedsPerPage * page));
  }, [breedsData, filters, page, selectedConsonant, selectedTheme, searchQuery]);
  
  useEffect(() => {
    filterBreeds();
  }, [filters, breedsData, filterBreeds, page, selectedConsonant, selectedTheme, searchQuery]);
  

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

  const handleSearchButtonClick = () => {
    console.log('Search button clicked'); // 콘솔 로그 추가
    setSearchQuery(searchInput);
    setPage(1);
    setAutocompleteResults([]);
    filterBreeds(); // 검색 실행
  };

  const handleAutocompleteItemClick = (breed) => {
    setSearchQuery(breed.englishName);
    setSearchInput(breed.englishName);
    setAutocompleteResults([]);
    console.log('Autocomplete item clicked:', breed); // 콘솔 로그 추가
    filterBreeds(); // 검색 실행
  };

  const handleSearchInputChange = (e) => {
    const query = e.target.value;
    setSearchInput(query);
    console.log('Search input changed:', query); // 콘솔 로그 추가
    if (query !== '') {
      const results = Object.values(breedsData).filter(breed =>
        breed.englishName.toLowerCase().includes(query.toLowerCase()) ||
        breed.koreanName.toLowerCase().includes(query.toLowerCase())
      );
      console.log('Autocomplete results:', results); // 콘솔 로그 추가
      setAutocompleteResults(results.slice(0, 5));
    } else {
      setAutocompleteResults([]);
    }
  };

  const handleSearchInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearchButtonClick();
    }
  };

  const handleConsonantClick = (consonant) => {
    setSelectedConsonant(consonant === selectedConsonant ? null : consonant);
    setPage(1);
    filterBreeds();
  };

  const handleThemeClick = (theme) => {
    setSelectedTheme(theme === selectedTheme ? null : theme);
    setPage(1);
    filterBreeds();
  };

  const resetFilters = () => {
    setSelectedConsonant(null);
    setSelectedTheme(null);
    setFilters({
      size: 'all',
      breedGroup: 'all',
      affectionWithFamily: 'all',
      goodWithOtherDogs: 'all',
      trainabilityLevel: 'all',
      energyLevel: 'all',
      sheddingLevel: 'all'
    });
    setSearchQuery('');
    setSearchInput('');
    setPage(1);
    filterBreeds();
  };

  return (
    <Container>
      <FilterInfoContainer>
        <FilterInfo>
          현재 필터:{" "}
          {selectedConsonant || selectedTheme || filters.size !== 'all' || filters.breedGroup !== 'all' || filters.affectionWithFamily !== 'all' || filters.goodWithOtherDogs !== 'all' || filters.trainabilityLevel !== 'all' || filters.energyLevel !== 'all' || filters.sheddingLevel !== 'all' || searchQuery
            ? (
              <>
                {selectedConsonant && `자음: ${selectedConsonant}, `}
                {selectedTheme && `테마: ${themes.find(theme => theme.id === selectedTheme)?.name}, `}
                {filters.size !== 'all' && `크기: ${filters.size}, `}
                {filters.breedGroup !== 'all' && `견종 그룹: ${filters.breedGroup}, `}
                {filters.affectionWithFamily !== 'all' && `가족과의 애정: ${filters.affectionWithFamily}, `}
                {filters.goodWithOtherDogs !== 'all' && `다른 개와의 친화력: ${filters.goodWithOtherDogs}, `}
                {filters.trainabilityLevel !== 'all' && `훈련 가능성: ${filters.trainabilityLevel}, `}
                {filters.energyLevel !== 'all' && `에너지 수준: ${filters.energyLevel}, `}
                {filters.sheddingLevel !== 'all' && `털 빠짐 정도: ${filters.sheddingLevel}, `}
                {searchQuery && `검색어: ${searchQuery}`}
              </>
            ) : "없음"
          }
        </FilterInfo>

        <ResetButton onClick={resetFilters}>필터 초기화</ResetButton>
      </FilterInfoContainer>
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
      <ThemeFilterContainer>
        {themes.map((theme) => (
          <ThemeButton
            key={theme.id}
            selected={theme.id === selectedTheme}
            onClick={() => handleThemeClick(theme.id)}
          >
            {theme.name}
          </ThemeButton>
        ))}
      </ThemeFilterContainer>
      <SearchBarContainer ref={autocompleteRef}>
        <SearchBar
          type="text"
          placeholder="한국어나 영어로 종을 검색하세요"
          value={searchInput}  // 검색 입력 상태 사용
          onChange={handleSearchInputChange}
          onKeyDown={handleSearchInputKeyDown} // Enter 키 이벤트 핸들러 추가
        />
        <SearchButton onClick={handleSearchButtonClick}>Search</SearchButton>
        {autocompleteResults.length > 0 && (
          <AutocompleteList>
            {autocompleteResults.map((breed, index) => (
              <AutocompleteItem key={index} onClick={() => handleAutocompleteItemClick(breed)}>
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
            <Card style={{ height: "300px" }}>
              <ClipLoader color="#4caf50" size={50} />
            </Card>
            <Card style={{ height: "300px" }}>
              <ClipLoader color="#4caf50" size={50} />
            </Card>
            <Card style={{ height: "300px" }}>
              <ClipLoader color="#4caf50" size={50} />
            </Card>
          </>
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
