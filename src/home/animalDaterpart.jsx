import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Grid, Card, Image, CardContent, Title, Text } from './animalDaterPartCss';
import DescriptionSection from './DescriptionSection';

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
    <Container>
      <DescriptionSection />
      <Grid>
        {breeds.map(breed => (
          <Card key={breed.id}>
            <Image src={breed.image?.url} alt={breed.name} />
            <CardContent>
              <Title>{breed.name}</Title>
              <Text>Bred for: {breed.bred_for || 'N/A'}</Text>
              <Text>Breed group: {breed.breed_group || 'N/A'}</Text>
              <Text>Life span: {breed.life_span || 'N/A'}</Text>
              <Text>Shedding level: {breed.shedding_level || 'N/A'}</Text>
            </CardContent>
          </Card>
        ))}
      </Grid>
    </Container>
  );
};

export default App;
