// src/dataPatch/fetchAndStoreBreeds.js
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const fetchBreedsFromFirestore = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'dogs'));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching breeds from Firestore:', error);
    return [];
  }
};

const mergeBreedsData = async (firestoreData) => {
  // Sorting the data by Korean names in alphabetical order
  const sortedData = firestoreData.sort((a, b) => {
    const nameA = a.koreanName || '';
    const nameB = b.koreanName || '';
    return nameA.localeCompare(nameB, 'ko');
  });

  // Merging the sorted data
  const mergedData = sortedData.reduce((acc, breed) => {
    acc[breed.englishName.toLowerCase()] = breed;
    return acc;
  }, {});

  return mergedData;
};

const fetchAndStoreBreeds = async () => {
  const firestoreData = await fetchBreedsFromFirestore();
  const mergedData = await mergeBreedsData(firestoreData);
  
  localStorage.setItem('breedsData', JSON.stringify(mergedData));
};

const getBreedsData = () => {
  const data = localStorage.getItem('breedsData');
  return data ? JSON.parse(data) : null;
};

export { fetchAndStoreBreeds, getBreedsData };
