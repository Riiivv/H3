export interface MoviesDTORequest {
  moviesId: number;
  title: string;
  genre: string;
  releaseDate: string; // send ISO: "2026-01-13" eller "2026-01-13T00:00:00"
  director: string;
}

export interface MoviesDTOResponse {
  moviesId: number;
  title: string;
  genre: string;
  releaseDate: string;
  director: string;
}

// Din backend forventer: { request: MoviesDTORequest }
export interface MoviesRequestWrapper {
  request: MoviesDTORequest;
}
