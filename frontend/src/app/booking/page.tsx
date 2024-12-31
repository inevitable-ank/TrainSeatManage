// 'use client';

// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import SeatGrid from '@/components/SeatGrid';
// import BookingForm from '@/components/BookingForm';

// interface Seat {
//   id: number;
//   row_number: number;
//   seat_number: number;
//   is_reserved: boolean;
// }

// const BookingPage = () => {
//   const [seats, setSeats] = useState<Seat[]>([]);
//   const [selectedSeats, setSelectedSeats] = useState<number[]>([]);

//   useEffect(() => {
//     const fetchSeats = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/seats');
//         setSeats(response.data);
//       } catch (error) {
//         alert('Error fetching seats.');
//       }
//     };

//     fetchSeats();
//   }, []);

//   const handleSeatClick = (seatId: number) => {
//     setSelectedSeats((prev) =>
//       prev.includes(seatId)
//         ? prev.filter((id) => id !== seatId)
//         : [...prev, seatId]
//     );
//   };

//   const handleBooking = async () => {
//     try {
//       await axios.post('/api/seats', { seatIds: selectedSeats });
//       alert('Seats booked successfully!');
//       setSelectedSeats([]); // Clear selection
//     } catch (error) {
//       alert('Error booking seats.');
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
//       <h2 className="text-2xl font-bold mb-4">Book Your Seats</h2>
//       <SeatGrid seats={seats} selectedSeats={selectedSeats} onSeatClick={handleSeatClick} />
//       <BookingForm selectedSeats={selectedSeats} onSubmit={handleBooking} />
//     </div>
//   );
// };

// export default BookingPage;

// 2nd code 
'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Seat } from '@/types/seat';
import SeatGrid from '@/components/SeatGrid';
import BookingForm from '@/components/BookingForm';

const BookingPage = () => {
  const [seats, setSeats] = useState<Seat[]>([]);
  const [availableSeats, setAvailableSeats] = useState<number>(0);
  const [bookedSeats, setBookedSeats] = useState<number>(0);
  const [bookedSeatNumbers, setBookedSeatNumbers] = useState<number[]>([]);
  

  const fetchSeats = async () => {
    try {
      const response = await axios.get<Seat[]>(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/seats`);
      const fetchedSeats = response.data;

      setSeats(fetchedSeats);
      setAvailableSeats(fetchedSeats.filter((seat) => !seat.is_reserved).length);
      setBookedSeats(fetchedSeats.filter((seat) => seat.is_reserved).length);
      setBookedSeatNumbers(fetchedSeats.filter((seat) => seat.is_reserved).map((seat) => seat.id));
    } catch (error) {
      console.log(error)
      alert('Error fetching seats.');
    }
  };

  const handleBooking = async (seatCount: number) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please log in to book seats.');
        return;
      }

      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/seats`,
        { seatCount },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert('Seats booked successfully!');
      fetchSeats(); // Refresh seat data after booking
    } catch (error) {
      console.log(error)
      alert('Error booking seats.');
    }
  };

  const handleReset = async () => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/seats/reset`);
      alert('All seats have been reset!');
      fetchSeats(); // Refresh seat data after resetting
    } catch (error) {
      console.log(error)
      alert('Error resetting seats.');
    }
  };

  useEffect(() => {
    fetchSeats();
  }, []);

  return (
    <div className="min-h-screen flex justify-center items-start bg-gray-100 p-4">
      <div className="flex w-full max-w-5xl bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Seat Grid Section */}
        <div className="w-2/3 p-6 border-r border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Ticket Booking</h2>
          <SeatGrid seats={seats} />
          <div className="mt-6 flex justify-between">
            <div className="bg-yellow-500 text-white px-4 py-2 rounded">
              Booked Seats: {bookedSeats}
            </div>
            <div className="bg-green-500 text-white px-4 py-2 rounded">
              Available Seats: {availableSeats}
            </div>
          </div>
        </div>

        {/* Booking Form Section */}
        <div className="w-1/3 p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Book Seats</h2>
          <div className="mb-4">
            <h3 className="text-lg font-medium text-gray-800">Booked Seats:</h3>
            {bookedSeatNumbers.length > 0 ? (
              <div className="flex flex-wrap gap-2 mt-2">
                {bookedSeatNumbers.map((seatNumber) => (
                  <div
                    key={seatNumber}
                    className="px-2 py-1 bg-red-500 text-white rounded text-sm font-medium"
                  >
                    {seatNumber}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 text-sm">No seats are booked yet.</p>
            )}
          </div>
          <BookingForm onSubmit={handleBooking} availableSeats={availableSeats} />
          <button
            onClick={handleReset}
            className="w-full mt-4 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Reset Booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
