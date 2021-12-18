import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../reducers';
import { State } from '../reducers/tournaments';

const selectTournaments = (state: RootState) => state.tournaments as State;

export const selectList = createSelector(
  selectTournaments,
  items => items.list
);
export const selectLoading = createSelector(
  selectTournaments,
  items => items.loading
);
export const selectError = createSelector(
  selectTournaments,
  items => items.error
);
