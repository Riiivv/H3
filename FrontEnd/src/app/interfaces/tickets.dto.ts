export interface TicketDTORequest {
  ticketId: number;      // create: 0
  ticketPrice: number;
  seatId: number;
  movieId: number;
}

export interface TicketDTOResponse {
  ticketId: number;
  ticketPrice: number;
  seatId: number;
  movieId: number;
  movieTitle?: string | null;
}