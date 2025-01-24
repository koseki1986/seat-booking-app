import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const BookSeat = () => {
  const { seatId } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [error, setError] = useState("");
  const [seat, setSeat] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSeat = async () => {
      try {
        const seatNumber = parseInt(seatId, 10);
        if (seatNumber < 1 || seatNumber > 300) {
          setError("Seat not found");
          setIsLoading(false);
          return;
        }

        const response = await axios.get(
          `http://localhost:5000/api/seats/${seatId}`
        );
        if (!response.data) {
          setError("Seat not found");
        } else {
          setSeat(response.data);
        }
      } catch (error) {
        console.error("Error fetching seat:", error);
        setError("Failed to fetch seat information");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSeat();
  }, [seatId]);

  const handleBook = async () => {
    if (!name.trim() || !department.trim()) {
      setError("Please enter your name and department.");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:5000/api/seats/${seatId}/book`,
        {
          bookedBy: name,
          department: department,
        }
      );

      if (response.data) {
        alert("Seat booked successfully!");
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to book seat.");
    }
  };

  const handleRelease = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/seats/${seatId}/release`
      );
      if (response.data) {
        alert("Seat released successfully!");
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to release seat.");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="book-seat">
      <h2>Seat {seatId}</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {seat && (
        <>
          <p>Status: {seat.isBooked ? "Booked" : "Available"}</p>
          {seat.isBooked && (
            <>
              <p>Booked by: {seat.bookedBy}</p>
              <p>Department: {seat.department}</p>
            </>
          )}
        </>
      )}
      {seat && !seat.isBooked && (
        <>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter your department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          />
          <button onClick={handleBook}>Book</button>
        </>
      )}
      {seat && seat.isBooked && (
        <button onClick={handleRelease}>Release Seat</button>
      )}
    </div>
  );
};

export default BookSeat;
