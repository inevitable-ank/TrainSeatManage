# Train Reservation System

A simple and efficient system for booking train seats online. Built using **Next.js**, **Node.js**, and **PostgreSQL**, this application allows users to book train seats, view booked seats, and reset bookings seamlessly.

---

## Features

- **User Authentication**: Secure login and sign-up functionality.
- **Seat Booking**: Book between 1-7 seats at a time.
- **Dynamic Seat Grid**: Real-time updates on available and booked seats.
- **Reset Functionality**: Admin can reset all bookings to start fresh.
- **Responsive Design**: Optimized for all screen sizes.
- **API Integration**: Well-documented backend APIs for seat management.

---

## Tech Stack

- **Frontend**: Next.js, TailwindCSS
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL (Deployed on Render)

---

## Setup Instructions

### Prerequisites

Ensure you have the following installed:
- Node.js (v18 or higher)
- PostgreSQL (v12 or higher)
- A package manager (npm or yarn)

---

### Backend Setup

1. Clone the repository and navigate to the backend folder:
    ```bash
    git clone <repository_url>
    cd backend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the backend directory and add the following:
    ```env
    PORT=5000
    DATABASE_URL=postgres://<username>:<password>@<host>:<port>/<database>
    JWT_SECRET=<your_secret_key>
    ```

4. Initialize the database with the following SQL script:
    ```sql
    CREATE TABLE seats (
        id SERIAL PRIMARY KEY,
        row_number INT,
        seat_number INT,
        is_reserved BOOLEAN DEFAULT FALSE
    );

    INSERT INTO seats (row_number, seat_number, is_reserved)
    VALUES
        (1, 1, FALSE), (1, 2, FALSE), ..., (12, 3, FALSE);
    ```

5. Start the server:
    ```bash
    npm start
    ```
    The backend will run on `http://localhost:5000`.

---

### Frontend Setup

1. Navigate to the frontend folder:
    ```bash
    cd ../frontend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env.local` file in the frontend directory and add the following:
    ```env
    NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
    ```

4. Start the development server:
    ```bash
    npm run dev
    ```
    The frontend will run on `http://localhost:3000`.

---

## API Documentation

### Base URL
http://localhost:5000/api


#### Authentication

- **Login**
    - **Endpoint**: `/auth/login`
    - **Method**: POST
    - **Body**:
        ```json
        {
            "email": "user@example.com",
            "password": "password123"
        }
        ```
    - **Response**:
        ```json
        {
            "token": "<jwt_token>"
        }
        ```

- **Sign Up**
    - **Endpoint**: `/auth/signup`
    - **Method**: POST
    - **Body**:
        ```json
        {
            "username": "JohnDoe",
            "email": "user@example.com",
            "password": "password123"
        }
        ```

#### Seat Management

- **Get All Seats**
    - **Endpoint**: `/seats`
    - **Method**: GET
    - **Response**:
        ```json
        [
            {
                "id": 1,
                "row_number": 1,
                "seat_number": 1,
                "is_reserved": false
            },
            ...
        ]
        ```

- **Book Seats**
    - **Endpoint**: `/seats`
    - **Method**: POST
    - **Headers**:
        ```json
        {
            "Authorization": "Bearer <jwt_token>"
        }
        ```
    - **Body**:
        ```json
        {
            "seatCount": 3
        }
        ```
    - **Response**:
        ```json
        {
            "message": "Seats booked successfully",
            "seats": [
                {
                    "id": 10,
                    "row_number": 2,
                    "seat_number": 3,
                    "is_reserved": true
                },
                ...
            ]
        }
        ```

- **Reset All Seats**
    - **Endpoint**: `/seats/reset`
    - **Method**: POST
    - **Response**:
        ```json
        {
            "message": "All seats have been reset."
        }
        ```

---

### Project Structure

```bash
backend/
├── controllers/
│   ├── authController.js
│   └── seatController.js
├── routes/
│   ├── authRoutes.js
│   └── seatRoutes.js
├── utils/
│   └── db.js
├── app.js
└── server.js

frontend/
├── components/
│   ├── BookingForm.tsx
│   ├── LoginForm.tsx
│   ├── SeatGrid.tsx
│   └── SignupForm.tsx
├── pages/
│   ├── login/
│   │   └── page.tsx
│   ├── signup/
│   │   └── page.tsx
│   ├── booking/
│   │   └── page.tsx
│   └── index.tsx
├── styles/
│   └── globals.css
└── types/
    └── seat.ts
