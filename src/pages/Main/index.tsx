import React, { FC, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { loadTournaments, retryFetch } from '../../actions/tournaments';
import { selectError, selectLoading } from '../../selectors/tournaments';

import Container from '../../components/Container';
import H4 from '../../components/H4';
import Error from './components/Error';
import Loading from './components/Loading';
import CardList from '../../components/CardList';
import Button from '../../components/Button';
import useEditCard from '../../hooks/useEditCard';
import SearchInput from '../../components/SearchInput';

const Main: FC = () => {
  const dispatch = useCallback(useDispatch(), []);
  const { onEdit } = useEditCard();

  const isLoading = useSelector(selectLoading);
  const hasError = useSelector(selectError);

  useEffect(() => {
    dispatch(loadTournaments());
  }, [dispatch]);

  const handleOnRetry = () => {
    dispatch(retryFetch());
  };

  return (
    <Container>
      <H4>FACEIT Tournaments</H4>
      <WrapperThumbs>
        <SearchInput />
        <Button onClick={onEdit}>CREATE TOURNAMENT</Button>
      </WrapperThumbs>
      {hasError && <Error onRetry={handleOnRetry} />}
      {isLoading && <Loading />}
      {!hasError && !isLoading && <CardList />}
    </Container>
  );
};

const WrapperThumbs = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default Main;
