import { createAsyncThunk } from '@reduxjs/toolkit';

import api from '../utils/api';
import { API_TOURNAMENTS_URL } from '../constants/api';
import { State, TournamentItemState } from '../reducers/tournaments';

type EditProps = {
  id?: string | undefined;
  value: string;
};

export const editTournament = createAsyncThunk<EditProps, EditProps>(
  'tournament/edit',
  async ({ id, value }: EditProps) => {
    // TODO: change to real endpoint for editing and
    // const response = await api.delete(`${API_TOURNAMENTS_EDIT_URL}?id=${id}`);
    // return response.data;
    await setTimeout(() => {
      // fake async
      console.log('Editing...', id, value);
    }, 1);

    return { id, value };
  }
);

export const addTournament = createAsyncThunk<TournamentItemState, EditProps>(
  'tournament/add',
  async ({ value }: EditProps) => {
    const response = await api.post(API_TOURNAMENTS_URL, { name: value });
    return response.data;
  }
);

export const deleteTournament = createAsyncThunk<string, string>(
  'tournament/delete',
  async (id: string) => {
    // TODO: change to real endpoint for removal and
    // const response = await api.delete(`${API_TOURNAMENTS_DELETE_URL}?id=${id}`);
    // return response.data;
    await setTimeout(() => {
      // fake async
      console.log('Deleting...', id);
    }, 1);

    return id;
  }
);

export const loadTournaments = createAsyncThunk<
  State['list'],
  string | undefined
>('tournament/load', async (search = undefined) => {
  const response = await api.get(
    search ? `${API_TOURNAMENTS_URL}?q=${search}` : API_TOURNAMENTS_URL
  );
  return response.data;
});

export const retryFetch = createAsyncThunk<
  State['list'] | TournamentItemState | string,
  string | undefined
>('tournament/retry', async () => {
  const response = await api.retry();
  return response?.data;
});
