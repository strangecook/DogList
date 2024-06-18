// store/useStore.js
import create from 'zustand';

const useStore = create((set) => ({
  breeds: {},
  selectedBreed: null, // 초기값을 null로 설정
  addBreed: (breedName, breedData) => set((state) => ({
    breeds: { ...state.breeds, [breedName.toLowerCase()]: breedData },
  })),
  setSelectedBreed: (breed) => set({ selectedBreed: breed }), // 바로 breed를 설정
  getBreed: (breedName) => (state) => state.breeds[breedName.toLowerCase()],
}));

export default useStore;
