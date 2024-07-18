import React, { useEffect } from 'react';
import styled from 'styled-components';
import useStore from '../store/useStore'; // Zustand store import

const FilterSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-bottom: 20px;
  @media (max-width: 768px) {
    justify-content: space-between; // 공간을 고르게 분배
  }
`;

const DropdownContainer = styled.div`
  margin: 5px;
  position: relative; // 추가된 부분
  @media (max-width: 768px) {
    flex: 1 1 calc(50% - 10px); // 모바일에서는 한 줄에 50% 너비로 두 줄로 배치
    min-width: 100px; // 최소 너비 설정
  }

  &:nth-child(n+3) {
    @media (max-width: 768px) {
      display: none; // 세 번째 필터부터는 모바일에서 숨김
    }
  }
`;

const Dropdown = styled.select`
  width: 100%; // 추가된 부분
  padding: 10px;
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: border-color 0.3s ease;
  position: relative; // 추가된 부분

  &:focus {
    border-color: #4caf50;
    outline: none;
  }

  @media (max-width: 768px) {
    padding: 6px; // 모바일에서 패딩 크기 줄임
    font-size: 0.9em; // 모바일에서 폰트 크기 줄임
  }
`;

const Label = styled.label`
  margin-right: 10px;
  font-weight: bold;

  @media (max-width: 768px) {
    margin-right: 5px; // 모바일에서 마진 크기 줄임
    font-size: 0.9em; // 모바일에서 폰트 크기 줄임
  }
`;

const filterOptions = [
  { name: 'size', label: '크기', options: ['모두', '소형견', '중형견', '대형견', '초대형견'] },
  { name: 'breedGroup', label: '견종 그룹', options: ['모두', '논스포팅', '스포팅', '스피츠', '워킹', '테리어', '토이', '하운드', '허딩'] },
  { name: 'affectionWithFamily', label: '가족과의 애정', options: ['모두', '1', '2', '3', '4', '5'] },
  { name: 'goodWithOtherDogs', label: '다른 개와 친화력', options: ['모두', '1', '2', '3', '4', '5'] },
  { name: 'trainabilityLevel', label: '훈련 가능성', options: ['모두', '1', '2', '3', '4', '5'] },
  { name: 'energyLevel', label: '에너지 수준', options: ['모두', '1', '2', '3', '4', '5'] },
  { name: 'sheddingLevel', label: '털 빠짐 정도', options: ['모두', '1', '2', '3', '4', '5'] },
];

const Filters = ({ filters, setFilters }) => {
  const { setStoredFilters } = useStore();

  const handleDropdownChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  useEffect(() => {
    setStoredFilters(filters); // Zustand store에 필터 저장
    console.log('Filters updated in Zustand store and localStorage:', filters);
  }, [filters, setStoredFilters]);

  return (
    <FilterSection>
      {filterOptions.map(({ name, label, options }) => (
        <DropdownContainer key={name}>
          <Label>{label}:</Label>
          <Dropdown name={name} value={filters[name]} onChange={handleDropdownChange}>
            {options.map((option, index) => (
              <option key={index} value={option === '모두' ? 'all' : option}>
                {option}
              </option>
            ))}
          </Dropdown>
        </DropdownContainer>
      ))}
    </FilterSection>
  );
};

export default Filters;
