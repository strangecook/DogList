import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Grid, Card, ImageContainer, Image, CardContentTopLeft, CardContentBottomRight, Title, Text, SearchBar } from './animalDaterPartCss';
import DescriptionSection from './DescriptionSection';
import CustomModal from '../component/Modal';

const ImageWithFallback = ({ src, alt }) => {
  const [imgSrc, setImgSrc] = useState(src);

  const handleError = () => {
    setImgSrc('fallback-image-url');
  };

  return <Image src={imgSrc} alt={alt} onError={handleError} />;
};

const App = () => {
  const [breeds, setBreeds] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedBreed, setSelectedBreed] = useState(null);
  const apiKey = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const response = await axios.get('https://api.thedogapi.com/v1/breeds', {
          headers: {
            'x-api-key': apiKey
          }
        });

        const filteredBreeds = response.data.filter(breed => {
          const image = breed.image;
          return image && image.width > image.height;
        });

        setBreeds(filteredBreeds);
      } catch (error) {
        console.error('Error fetching breeds:', error);
      }
    };

    fetchBreeds();
  }, [apiKey]);

  const filteredBreeds = breeds.filter(breed =>
    breed.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <SearchBar
          type="text"
          placeholder="Search for a breed..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Grid>
          {filteredBreeds.map(breed => (
            <Card key={breed.id} onClick={() => openModal(breed)}>
              <ImageContainer>
                <ImageWithFallback src={breed.image?.url} alt={breed.name} />
                <CardContentTopLeft>
                  <Title>{breed.name}</Title>
                </CardContentTopLeft>
                <CardContentBottomRight>
                  <Text>{breed.bred_for || 'N/A'}</Text>
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
    </>
  );
};

export default App;
