import { createReducer } from '@reduxjs/toolkit';

import { addTournament, deleteTournament, editTournament, loadTournaments, retryFetch } from '../actions/tournaments';
import { TournamentResponse, TournamentItemResponse } from '../types';

export type TournamentItemState = TournamentItemResponse;

type RequestType = 'loadTournaments' | 'addTournament' | 'editTournament' | 'deleteTournament' | undefined;

export type State = {
  list: TournamentResponse;
  loading: boolean;
  error: boolean;
  lastRequestType: RequestType;
};

const initialState = {
  list: [],
  loading: false,
  error: false,
  lastRequestType: undefined,
};

const transformStateOnFulfilled = (state: State, action: any, type?: RequestType) => {
  const _type = type || state.lastRequestType;

  state.loading = false;
  state.error = false;

  console.log('TYPE', type)

  switch (_type) {
    case 'loadTournaments':
      state.list = action.payload;
      break;
    case 'editTournament':
      state.list = state.list.map(item => item.id !== action.meta.arg.id ? item : {...item, name: action.meta.arg.value });
      break;
    case 'addTournament':
      console.log(action.payload);
      state.list.unshift(action.payload);
      break;
  }
};

export default createReducer(initialState, (builder) => {
  builder
    .addCase(addTournament.pending, (state: State, action) => {
      state.lastRequestType = 'addTournament';
    })
    .addCase(addTournament.fulfilled, (state: State, action) => {
      transformStateOnFulfilled(state, action, 'addTournament');
    })
    .addCase(addTournament.rejected, (state: State, action) => {
      state.loading = false;
      state.error = true;
    })
    .addCase(deleteTournament.pending, (state: State, action) => {
      state.lastRequestType = 'deleteTournament';
      state.list = state.list.filter(item => item.id !== action.meta.arg);
    })
    .addCase(deleteTournament.fulfilled, (state: State, action) => {
    })
    .addCase(editTournament.pending, (state: State, action) => {
      state.lastRequestType = 'editTournament';
      transformStateOnFulfilled(state, action, 'editTournament');
    })
    .addCase(editTournament.fulfilled, (state: State, action) => {
    })
    .addCase(loadTournaments.pending, (state: State, action) => {
      state.loading = true;
      state.error = false;
      state.list = [];
      state.lastRequestType = 'loadTournaments';
    })
    .addCase(loadTournaments.fulfilled, (state: State, action) => {
      transformStateOnFulfilled(state, action, 'loadTournaments');
    })
    .addCase(loadTournaments.rejected, (state: State, action) => {
      state.loading = false;
      state.error = true;
    })
    .addCase(retryFetch.pending, (state: State, action) => {
      state.loading = true;
      state.error = false;
    })
    .addCase(retryFetch.fulfilled, (state: State, action) => {
      transformStateOnFulfilled(state, action);
    })
    .addCase(retryFetch.rejected, (state: State, action) => {
      state.loading = false;
      state.error = true;
    })
})
