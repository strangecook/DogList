import React from 'react';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';
import AnimalDaterpart from '../home/animalDaterpart';
import Descriptionpage from '../home/Descriptionpage';

const MainCoverdiv = styled.div`
  margin: 0;
  width: 100vw;
  background-position: center;
`;

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Dog List - 완벽한 개 품종 찾기</title>
        <meta name="description" content="다양한 강아지 품종에 대한 신뢰할 수 있는 정보 제공. 품종 특성, 관리 방법, 가족에게 맞는 반려견 찾기 팁 등 최신 정보를 확인하세요. 사용자 참여로 더욱 풍부한 데이터를 구축합니다." />
        <meta name="keywords" content="개, 개 품종, 개 리스트, 애완동물, 동물" />
        <meta property="og:title" content="Dog List - 완벽한 개 품종 찾기" />
        <meta property="og:description" content="다양한 강아지 품종에 대한 신뢰할 수 있는 정보 제공. 품종 특성, 관리 방법, 가족에게 맞는 반려견 찾기 팁 등 최신 정보를 확인하세요. 사용자 참여로 더욱 풍부한 데이터를 구축합니다." />
        <meta property="og:image" content="/mainImage.avif" />
        <meta property="og:url" content="https://www.doglist.info/" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://www.doglist.info/" />
        <script type="application/ld+json">
          {`
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Dog List",
            "url": "https://www.doglist.info",
            "description": "다양한 강아지 품종에 대한 신뢰할 수 있는 정보 제공.",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://www.doglist.info/?s={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          }
          `}
        </script>
      </Helmet>
      <MainCoverdiv>
        <Descriptionpage />
        <AnimalDaterpart />
      </MainCoverdiv>
    </>
  );
}
