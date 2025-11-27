export interface Film {
  FilmId: number;
  Title: string;
  ReleaseYear: number;
  Genre: string;
  imageUrl: string;

  showtimes?: {
    hall: string;
    times: string[];
  }[];
}