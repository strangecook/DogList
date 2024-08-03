// src/dataPatch/fetchAndStoreBreeds.js

import { collection, getDocs } from 'firebase/firestore';
import { ref, getDownloadURL, listAll } from 'firebase/storage';
import { db, storage } from '../firebase';

// Fetch breeds data from Firestore
const fetchBreedsFromFirestore = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'dogs'));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching breeds from Firestore:', error);
    return [];
  }
};

// Merge breeds data and sort by Korean names
const mergeBreedsData = async (firestoreData) => {
  const sortedData = firestoreData.sort((a, b) => {
    const nameA = a.koreanName || '';
    const nameB = b.koreanName || '';
    return nameA.localeCompare(nameB, 'ko');
  });

  const mergedData = sortedData.reduce((acc, breed) => {
    acc[breed.englishName.toLowerCase()] = breed;
    return acc;
  }, {});

  return mergedData;
};

// Fetch images from Firebase Storage
const fetchImagesFromStorage = async (breedName) => {
  try {
    const formattedBreedName = breedName.replace(/ /g, '_');
    const folderRef = ref(storage, `dog/${formattedBreedName}`);
    const fileList = await listAll(folderRef);

    if (fileList.items.length > 0) {
      const imageUrls = await Promise.all(
        fileList.items.map(async (itemRef) => {
          const url = await getDownloadURL(itemRef);
          return url;
        })
      );
      return imageUrls;
    } else {
      return [];
    }
  } catch (error) {
    console.error(`Error fetching images from Storage for breed ${breedName}:`, error);
    return [];
  }
};

// Fetch and store breeds data in localStorage
const fetchAndStoreBreeds = async () => {
  const firestoreData = await fetchBreedsFromFirestore();
  const mergedData = await mergeBreedsData(firestoreData);
  localStorage.setItem('breedsData', JSON.stringify(mergedData));
};

// Get breeds data from localStorage
const getBreedsData = () => {
  const data = localStorage.getItem('breedsData');
  return data ? JSON.parse(data) : null;
};

export { fetchAndStoreBreeds, getBreedsData, fetchImagesFromStorage };
