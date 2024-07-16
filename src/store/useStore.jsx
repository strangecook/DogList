import create from 'zustand';
import { loadFromLocalStorage, saveToLocalStorage } from '../utils/localStorage';

const useStore = create((set) => ({
  storedBreeds: loadFromLocalStorage('storedBreeds') || {},
  setStoredBreeds: (breeds) => {
    set({ storedBreeds: breeds });
    saveToLocalStorage('storedBreeds', breeds);
  },
  storedFilters: loadFromLocalStorage('storedFilters') || {
    size: 'all',
    breedGroup: 'all', // breedGroup 필터 추가
    coatType: 'all',
    affectionWithFamily: 'all',
    goodWithOtherDogs: 'all',
    trainabilityLevel: 'all',
    energyLevel: 'all',
    sheddingLevel: 'all'
  },
  setStoredFilters: (filters) => {
    set({ storedFilters: filters });
    saveToLocalStorage('storedFilters', filters);
  },
  selectedBreed: null,
  setSelectedBreed: (breed) => set({ selectedBreed: breed }),
}));

export default useStore;
