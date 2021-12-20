import React from 'react';
import styled from 'styled-components';

import H6 from './H6';
import { TournamentItemState } from '../reducers/tournaments';
import { useDispatch } from 'react-redux';
import Button from './Button';
import { deleteTournament } from '../actions/tournaments';
import { dateFromIsoConvert } from '../utils/date';
import useEditCard from '../hooks/useEditCard';

type Props = TournamentItemState;

const Card = (props: Props) => {
  const dispatch = useDispatch();
  const { onEdit } = useEditCard();

  const handleOnEdit = () => {
    onEdit({ id: props.id, name: props.name });
  };

  const handleOnDelete = () => {
    if (window?.confirm('Do you really want to delete this tournament?')) {
      dispatch(deleteTournament(props.id));
    }
  };

  return (
    <Root>
      <H6>{props.name}</H6>

      <div>Organizer: {props.organizer}</div>
      <div>Game: {props.game}</div>
      <div>
        Participants: {props.participants.current}/{props.participants.max}
      </div>
      <div>Start: {dateFromIsoConvert(props.startDate)}</div>

      <WrapperButtons>
        <Button onClick={handleOnEdit}>Edit</Button>
        <Button onClick={handleOnDelete}>Delete</Button>
      </WrapperButtons>
    </Root>
  );
};

const Root = styled.div`
  background: #202020;
  padding: 17px;
  border-radius: 4px;
`;

const WrapperButtons = styled.div`
  button {
    margin-top: 8px;
    margin-right: 8px;
  }
`;

export default Card;
