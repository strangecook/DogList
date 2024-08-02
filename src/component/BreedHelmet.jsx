// src/components/BreedHelmet.js

import React from 'react';
import { Helmet } from 'react-helmet-async';

const BreedHelmet = ({ breed, images }) => {
  if (!breed || !images || images.length === 0) return null;

  return (
    <Helmet>
      <title>{`${breed.koreanName} (${breed.englishName}) - Dog List`}</title>
      <meta
        name="description"
        content={`당신에게 맞는 강아지를 찾고 있나요? ${breed.koreanName}은(는) ${breed.temperament} 성격을 가진 품종입니다. ${breed.breedGroup} 그룹에 속하며, 키: ${breed.height}, 체중: ${breed.weight}, 수명: ${breed.lifeExpectancy}. 지금 더 알아보세요!`}
      />
      <meta
        name="keywords"
        content={`강아지, 개 품종, ${breed.koreanName}, ${breed.englishName}, 반려동물, 애완견`}
      />
      <meta
        property="og:title"
        content={`${breed.koreanName} (${breed.englishName}) - Dog List`}
      />
      <meta
        property="og:description"
        content={`품종: ${breed.koreanName}. 이 품종은 ${breed.breedGroup} 그룹에 속하며, 키: ${breed.height}, 체중: ${breed.weight}, 성격: ${breed.temperament}. 더 알아보세요!`}
      />
      <meta property="og:image" content={images[0]} />
      <meta property="og:url" content={`https://www.doglist.info/breeds/${breed.englishName}`} />
      <meta property="og:type" content="website" />
      <link rel="canonical" href={`https://www.doglist.info/breeds/${breed.englishName}`} />
      <script type="application/ld+json">
        {`
        {
          "@context": "https://schema.org",
          "@type": "DogBreed",
          "name": "${breed.koreanName}",
          "alternateName": "${breed.englishName}",
          "image": "${images[0]}",
          "description": "${breed.description}",
          "breedGroup": "${breed.breedGroup}",
          "height": "${breed.height}",
          "weight": "${breed.weight}",
          "lifeExpectancy": "${breed.lifeExpectancy}",
          "origin": "${breed.origin}",
          "coatLength": "${breed.coatLength}",
          "coatType": "${breed.coatType}",
          "adaptabilityLevel": "${breed.adaptabilityLevel}",
          "affectionWithFamily": "${breed.affectionWithFamily}",
          "goodWithOtherDogs": "${breed.goodWithOtherDogs}",
          "goodWithYoungChildren": "${breed.goodWithYoungChildren}",
          "opennessToStrangers": "${breed.opennessToStrangers}",
          "guardProtectiveInstinct": "${breed.guardProtectiveInstinct}",
          "energyLevel": "${breed.energyLevel}",
          "playfulnessLevel": "${breed.playfulnessLevel}",
          "needsMentalStimulation": "${breed.needsMentalStimulation}",
          "trainabilityLevel": "${breed.trainabilityLevel}",
          "sheddingLevel": "${breed.sheddingLevel}",
          "groomingLevel": "${breed.groomingLevel}",
          "barkingLevel": "${breed.barkingLevel}",
          "droolingLevel": "${breed.droolingLevel}",
          "temperament": "${breed.temperament}"
        }
        `}
      </script>
    </Helmet>
  );
};

export default BreedHelmet;
