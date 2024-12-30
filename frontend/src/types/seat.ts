export interface Seat {
    id: number;
    row_number: number;
    seat_number: number;
    is_reserved: boolean;
  }
  
  export interface SeatBookingRequest {
    seatIds: number[]; // Array of seat IDs to be booked
  }
  
  export interface SeatBookingResponse {
    success: boolean;
    message: string;
  }
  