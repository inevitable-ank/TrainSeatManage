// import { Seat } from '@/types/seat';

// interface SeatGridProps {
//   seats: Seat[]; // Array of Seat objects
//   selectedSeats: number[]; // Array of selected seat IDs
//   onSeatClick: (seatId: number) => void; // Callback function when a seat is clicked
// }

// const SeatGrid = ({ seats, selectedSeats, onSeatClick }: SeatGridProps) => {
//   return (
//     <div className="grid grid-cols-7 gap-2">
//       {seats.map((seat) => (
//         <button
//           key={seat.id}
//           onClick={() => onSeatClick(seat.id)}
//           className={`w-12 h-12 border rounded ${
//             seat.is_reserved
//               ? 'bg-red-500 cursor-not-allowed'
//               : selectedSeats.includes(seat.id)
//               ? 'bg-blue-500'
//               : 'bg-gray-200'
//           }`}
//           disabled={seat.is_reserved} // Disable button if the seat is reserved
//         >
//           {seat.row_number}-{seat.seat_number}
//         </button>
//       ))}
//     </div>
//   );
// };

// export default SeatGrid;

import { Seat } from '@/types/seat';

interface SeatGridProps {
  seats: Seat[];
}

const SeatGrid = ({ seats }: SeatGridProps) => {
  if (!Array.isArray(seats) || seats.length === 0) {
    return <p className="text-center text-gray-600">No seats available.</p>;
  }

  return (
    <div className="grid grid-cols-7 gap-1">
      {seats.map((seat) => (
        <button
          key={seat.id}
          className={`w-10 h-10 border rounded text-sm font-medium ${
            seat.is_reserved ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
          }`}
          disabled={seat.is_reserved}
        >
          {seat.id}
        </button>
      ))}
    </div>
  );
};

export default SeatGrid;
