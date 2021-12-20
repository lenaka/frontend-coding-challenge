import React from 'react';
import styled from 'styled-components';

import Card from './Card';
import { useSelector } from 'react-redux';
import { selectList } from '../selectors/tournaments';

const CardList = () => {
  const tournaments = useSelector(selectList);

  return tournaments.length ? (
    <Root>
      {tournaments.map(card => (
        <Card {...card} key={card.id} />
      ))}
    </Root>
  ) : (
    <WrapperNoData>No tournaments found.</WrapperNoData>
  );
};

const Root = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 24px;
  margin: 24px 0;
`;

const WrapperNoData = styled.div`
  text-align: center;
`;

export default CardList;
