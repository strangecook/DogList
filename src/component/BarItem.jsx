// src/components/BarItem.js

import React from 'react';
import { BarContainer, Emoji, Label, BarWrapper, Bar } from './BreedDetailStyles';

const BarItem = ({ emoji, label, level, reverse }) => (
  <BarContainer>
    <Emoji>{emoji}</Emoji>
    <Label>{label}: {level}</Label>
    <BarWrapper>
      <Bar width={`${level * 20}%`} reverse={reverse ? "true" : "false"} />
    </BarWrapper>
  </BarContainer>
);

export default BarItem;
