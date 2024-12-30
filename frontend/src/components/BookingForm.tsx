// import { SeatBookingRequest } from '@/types/seat';
// import { seatBookingSchema, validateForm } from '@/utils/validations';

// interface BookingFormProps {
//   selectedSeats: number[];
//   onSubmit: (data: SeatBookingRequest) => void; // Accepts SeatBookingRequest object
// }

// const BookingForm = ({ selectedSeats, onSubmit }: BookingFormProps) => {
//   const handleSubmit = () => {
//     const errors = validateForm(seatBookingSchema, { seatIds: selectedSeats });
//     if (errors) {
//       alert(errors.join('\n')); // Show validation errors
//       return;
//     }

//     onSubmit({ seatIds: selectedSeats }); // Passing SeatBookingRequest object
//   };

//   return (
//     <div className="mt-4">
//       <p className="mb-2">Selected Seats: {selectedSeats.join(', ')}</p>
//       <button
//         onClick={handleSubmit}
//         className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
//         disabled={selectedSeats.length === 0}
//       >
//         Book Seats
//       </button>
//     </div>
//   );
// };

// export default BookingForm;


import { useState } from 'react';

interface BookingFormProps {
  onSubmit: (seatCount: number) => void;
  availableSeats: number;
}

const BookingForm = ({ onSubmit, availableSeats }: BookingFormProps) => {
  const [seatCount, setSeatCount] = useState<string>('');

  const handleInputChange = (value: string) => {
    if (value === '' || /^[0-9]*$/.test(value)) {
      setSeatCount(value);
    }
  };

  const handleSubmit = () => {
    const parsedCount = Number(seatCount);

    if (parsedCount < 1 || parsedCount > 7) {
      alert('You can only book between 1 and 7 seats.');
      return;
    }

    onSubmit(parsedCount);
  };

  return (
    <div>
      <label className="block mb-2 font-medium text-gray-800">Enter number of seats:</label>
      <input
        type="text"
        className="border p-2 rounded w-full"
        value={seatCount}
        onChange={(e) => handleInputChange(e.target.value)}
        placeholder="Enter number of seats"
      />
      <button
        onClick={handleSubmit}
        className="mt-4 w-full py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition duration-300"
        disabled={!seatCount || Number(seatCount) > availableSeats || Number(seatCount) < 1}
      >
        Book
      </button>
    </div>
  );
};

export default BookingForm;
