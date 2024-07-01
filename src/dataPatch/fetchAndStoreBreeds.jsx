// src/dataPatch/fetchAndStoreBreeds.js
import axios from 'axios';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import fetchDogApiKey from './fetchDogApiKey';

const fetchDogApiData = async () => {
  try {
    const apiKey = await fetchDogApiKey();
    console.log('API Key:', apiKey);
    if (!apiKey) {
      throw new Error('No API key available');
    }
    const response = await axios.get('https://api.thedogapi.com/v1/breeds', {
      headers: { 'x-api-key': apiKey }
    });
    console.log('Dog API Data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching dog API data:', error);
    return [];
  }
};

const fetchBreedsFromFirestore = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'dogs'));
    console.log('Firestore Data:', querySnapshot.docs.map(doc => doc.data()));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching breeds from Firestore:', error);
    return [];
  }
};

const mergeBreedsData = (firestoreData, dogApiData) => {
  const mergedData = firestoreData.reduce((acc, breed) => {
    const matchingDogApiData = dogApiData.find(dog => dog.name.toLowerCase() === breed.englishName.toLowerCase());

    const breedWithImage = matchingDogApiData
      ? { ...breed, image: { url: matchingDogApiData.image.url } }
      : breed;

    acc[breed.englishName.toLowerCase()] = breedWithImage;
    return acc;
  }, {});

  console.log('Merged Data:', mergedData);
  return mergedData;
};

const fetchAndStoreBreeds = async () => {
  const dogApiData = await fetchDogApiData();
  const firestoreData = await fetchBreedsFromFirestore();
  const mergedData = mergeBreedsData(firestoreData, dogApiData);
  
  localStorage.setItem('breedsData', JSON.stringify(mergedData));
  console.log('Breeds Data stored in localStorage:', mergedData);
};

const getBreedsData = () => {
  const data = localStorage.getItem('breedsData');
  return data ? JSON.parse(data) : null;
};

export { fetchAndStoreBreeds, getBreedsData };
