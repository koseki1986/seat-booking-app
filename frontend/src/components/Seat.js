import React from "react";

const Seat = ({ seat, onBook }) => {
  return (
    <div className="seat">
      <h3>Seat ID: {seat.seatId}</h3>
      <img src={seat.qrCode} alt={`QR Code for Seat ${seat.seatId}`} />
      <p>{seat.isBooked ? `Booked by: ${seat.bookedBy}` : "Available"}</p>
      {!seat.isBooked && (
        <button onClick={() => onBook(seat.seatId)}>Book</button>
      )}
    </div>
  );
};

export default Seat;
