import React, { useRef } from 'react';
import CustomModal from '../component/Modal';

const CustomModalHandler = ({ modalIsOpen, setModalIsOpen, selectedBreed, setSelectedBreed }) => {
  const previousOverflow = useRef('');
  const scrollPosition = useRef(0);

//   const openModal = (breed) => {
//     previousOverflow.current = document.body.style.overflow;
//     scrollPosition.current = window.scrollY;
//     document.body.style.overflow = 'hidden';
//     setSelectedBreed(breed);
//     console.log('Modal Opened for Breed:', breed);
//     setModalIsOpen(true);
//   };

  const closeModal = () => {
    document.body.style.overflow = previousOverflow.current;
    window.scrollTo(0, scrollPosition.current);
    setModalIsOpen(false);
    console.log('Modal Closed');
    setSelectedBreed(null);
  };

  return (
    <>
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

export default CustomModalHandler;
