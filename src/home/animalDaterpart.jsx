import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Container, Grid, Card, ImageContainer, Image, CardContentTopLeft, CardContentBottomRight, Title, Text } from './animalDaterPartCss';
import DescriptionSection from './DescriptionSection';
import CustomModal from '../component/Modal';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const ImageWithFallback = ({ src, alt }) => {
  const [imgSrc, setImgSrc] = useState(src);

  const handleError = () => {
    setImgSrc('fallback-image-url');
  };

  return <Image src={imgSrc} alt={alt} onError={handleError} />;
};

const App = () => {
  const [allBreeds, setAllBreeds] = useState([]);
  const [displayedBreeds, setDisplayedBreeds] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedBreed, setSelectedBreed] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const breedsPerPage = 20;

  const fetchBreeds = useCallback(async () => {
    if (allBreeds.length === 0) {
      setIsFetching(true);
      try {
        const querySnapshot = await getDocs(collection(db, 'dogs'));
        const breedsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setAllBreeds(breedsData);
        setDisplayedBreeds(breedsData.slice(0, breedsPerPage));
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
          {console.log(displayedBreeds)}
          {displayedBreeds.map((breed, index) => (
            <Card 
              key={breed.id} 
              onClick={() => openModal(breed)}
              ref={displayedBreeds.length === index + 1 ? lastBreedElementRef : null}
            >
              <ImageContainer>
                <ImageWithFallback src={breed.image?.url} alt={breed.name} />
                <CardContentTopLeft>
                  <Title>{breed.koreanName}</Title>
                </CardContentTopLeft>
                <CardContentBottomRight>
                  <Text>{breed.temperament}</Text>
                </CardContentBottomRight>
              </ImageContainer>
            </Card>
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
