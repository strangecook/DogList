// src/components/Filters.js
import React, { useEffect } from 'react';
import styled from 'styled-components';
import useStore from '../store/useStore'; // Zustand store import

const FilterSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-bottom: 20px;
`;

const Dropdown = styled.select`
  padding: 10px;
  margin: 5px;
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #4caf50;
    outline: none;
  }
`;

const Label = styled.label`
  margin-right: 10px;
  font-weight: bold;
`;

const filterOptions = [
  { name: 'size', label: '크기', options: ['모두', '소형견', '중형견', '대형견', '초대형견'] },
  { name: 'coatType', label: '털 타입', options: ['모두', '뻣뻣한 털','매끈한 털','거친 털','꼬인 털','이중 털','곱슬 털','물결 털','비단 털','무모'] },
  { name: 'affectionWithFamily', label: '가족과의 애정', options: ['모두', '1', '2', '3', '4', '5'] },
  { name: 'goodWithOtherDogs', label: '다른 개와의 친화력', options: ['모두', '1', '2', '3', '4', '5'] },
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
        <div key={name}>
          <Label>{label}:</Label>
          <Dropdown name={name} value={filters[name]} onChange={handleDropdownChange}>
            {options.map((option, index) => (
              <option key={index} value={option === '모두' ? 'all' : option}>
                {option}
              </option>
            ))}
          </Dropdown>
        </div>
      ))}
    </FilterSection>
  );
};

export default Filters;
