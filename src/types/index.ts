export type ParticipantsResponse = {
    current: number;
    max: number;
};

export interface TournamentItemResponse {
  id: string;
  name: string,
  organizer: string,
  game: string,
  participants: ParticipantsResponse,
  startDate: string;
}

export type TournamentResponse = TournamentItemResponse[];