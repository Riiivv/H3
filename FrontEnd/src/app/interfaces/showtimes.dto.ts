export interface ShowTimesDTORequest {
  showtimeId: number;   // 0 ved create
  movieId: number;
  hallId: number;
  startTime: string;    // "2026-01-13T16:30:00"
  price: number;
}

export interface ShowtimesDTOResponse {
  showtimeId: number;
  movieId: number;
  movieTitle?: string;
  hallId: number;
  hallNumber?: number;
  startTime: string;
  price: number;
}