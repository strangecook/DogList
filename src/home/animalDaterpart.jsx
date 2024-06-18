import React, { useEffect, useState, useRef, useCallback } from 'react';
import axios from 'axios';
import { Container, Grid, FilterSection, Dropdown, SearchBar, SearchButton } from './animalDaterPartCss';
import DescriptionSection from './DescriptionSection';
import CustomModal from '../component/Modal';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { DogCard } from './dogCard';
import Modal from 'react-modal';

const App = () => {
  const [allBreeds, setAllBreeds] = useState([]);
  const [displayedBreeds, setDisplayedBreeds] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedBreed, setSelectedBreed] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [breedFilter, setBreedFilter] = useState('');
  const [sizeFilter, setSizeFilter] = useState('all');
  const [groupFilter, setGroupFilter] = useState('all');
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const breedsPerPage = 20;

  const previousOverflow = useRef(''); // 추가

  Modal.setAppElement('#root'); // react-modal의 App 요소 설정

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
        const dogApiData = await fetchDogApiData();
        const querySnapshot = await getDocs(collection(db, 'dogs'));
        const imagesSnapshot = await getDocs(collection(db, 'dogImages'));

        const breedsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        const imagesData = imagesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        const mergedData = breedsData.map(breed => {
          const matchingDogApiData = dogApiData.find(dog => dog.name.toLowerCase() === breed.englishName.toLowerCase());
          const matchingImage = imagesData.find(image => image.dog_name.toLowerCase() === breed.englishName.toLowerCase());
          
          if (matchingDogApiData) {
            return { ...breed, image: { url: matchingDogApiData.image.url } };
          } else if (matchingImage) {
            return { ...breed, image: { url: matchingImage.webformatURL } };
          } else {
            return breed;
          }
        });

        console.log('Merged Data:', mergedData); // 최종 데이터 확인

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
      if (entries[0].isIntersecting && !isFetching && displayedBreeds.length < allBreeds.length) {
        loadMoreBreeds();
      }
    });
    if (node) observer.current.observe(node);
  }, [isFetching, loadMoreBreeds, displayedBreeds.length, allBreeds.length]);

  const openModal = (breed) => {
    previousOverflow.current = document.body.style.overflow; // 현재 overflow 저장
    document.body.style.overflow = 'hidden';
    setSelectedBreed(breed);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    document.body.style.overflow = previousOverflow.current; // 이전 overflow 복구
    setModalIsOpen(false);
    setSelectedBreed(null);
  };

  const handleFilterChange = useCallback(() => {
    let filteredBreeds = allBreeds;

    if (breedFilter !== '') {
      filteredBreeds = filteredBreeds.filter(breed => 
        breed.englishName.toLowerCase().includes(breedFilter.toLowerCase()) ||
        breed.koreanName.toLowerCase().includes(breedFilter.toLowerCase())
      );
    }

    if (sizeFilter !== 'all') {
      filteredBreeds = filteredBreeds.filter(breed => breed.size.toLowerCase() === sizeFilter.toLowerCase());
    }

    if (groupFilter !== 'all') {
      filteredBreeds = filteredBreeds.filter(breed => breed.breedGroup.toLowerCase() === groupFilter.toLowerCase());
    }

    // 중복 제거
    const uniqueFilteredBreeds = filteredBreeds.reduce((acc, breed) => {
      if (!acc.find(b => b.id === breed.id)) {
        acc.push(breed);
      }
      return acc;
    }, []);

    setDisplayedBreeds(uniqueFilteredBreeds.slice(0, breedsPerPage));
  }, [allBreeds, breedFilter, sizeFilter, groupFilter, breedsPerPage]);

  useEffect(() => {
    if (isSearchClicked) {
      handleFilterChange();
      setIsSearchClicked(false);
    }
  }, [isSearchClicked, handleFilterChange]);

  // useEffect 추가: 컴포넌트 언마운트 시 스크롤 복구
  useEffect(() => {
    return () => {
      document.body.style.overflow = previousOverflow.current;
    };
  }, []);

  return (
    <>
      <Container>
        <DescriptionSection />
        <SearchBar 
          type="text" 
          placeholder="한국어나 영어로 종을 검색하세요" 
          value={breedFilter} 
          onChange={(e) => setBreedFilter(e.target.value)} 
        />
        <SearchButton onClick={() => setIsSearchClicked(true)}>Search</SearchButton>
        <FilterSection>
          <Dropdown value={sizeFilter} onChange={(e) => { setSizeFilter(e.target.value); setIsSearchClicked(true); }}>
            <option value="all">All Sizes</option>
            <option value="소형견">소형견</option>
            <option value="중형견">중형견</option>
            <option value="대형견">대형견</option>
            <option value="초대형견">초대형견</option>
          </Dropdown>
          <Dropdown value={groupFilter} onChange={(e) => { setGroupFilter(e.target.value); setIsSearchClicked(true); }}>
            <option value="all">All Groups</option>
            {Array.from(new Set(allBreeds.map(breed => breed.breedGroup))).map(group => (
              <option key={group} value={group}>{group}</option>
            ))}
          </Dropdown>
        </FilterSection>
        <Grid>
          {displayedBreeds.map((breed, index) => (
            <DogCard 
              key={`${breed.id}-${index}`} 
              breed={breed}
              onClick={openModal}
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
