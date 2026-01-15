export interface SeatsDTORequest {
  seatId: number;
  rowNumber: number;
  seatNumber: number;
  hallId: number;
  seatType: number;
}

export interface SeatsDTOResponse extends SeatsDTORequest {}
