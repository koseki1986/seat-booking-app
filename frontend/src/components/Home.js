import React, { useEffect, useState } from "react"; // 添加 useEffect 和 useState
import { Link } from "react-router-dom";
import axios from "axios";

//Home 组件
const Home = () => {
  // 定义座位状态
  const [seats, setSeats] = useState([]);

  // 获取座位数据
  useEffect(() => {
    // 发送 GET 请求获取座位数据
    axios
      .get("http://localhost:5000/api/seats")
      .then((response) => {
        console.log("Seats data:", response.data); // 打印数据
        // 更新座位状态
        setSeats(response.data);
      })
      .catch((error) => {
        console.error("Error fetching seats:", error);
      });
  }, []);

  // 将座位数据分成每 10 个一组
  const chunkedSeats = [];
  for (let i = 0; i < seats.length; i += 10) {
    chunkedSeats.push(seats.slice(i, i + 10));
  }

  return (
    <div className="home">
      <h1>Seat Booking App</h1>
      <div className="seats-container">
        {chunkedSeats.length > 0 ? (
          chunkedSeats.map((row, rowIndex) => (
            <div key={rowIndex} className="seat-row">
              {row.map((seat) => (
                <Link
                  key={seat.seatId}
                  to={`/book-seat/${seat.seatId}`}
                  className={`seat ${seat.isBooked ? "booked" : "available"}`}
                >
                  <span className="seat-id">{seat.seatId}</span>
                  <span className="seat-status">
                    {seat.isBooked ? "Booked" : "Available"}
                  </span>
                  {seat.bookedBy && (
                    <>
                      <span className="booked-by">{seat.bookedBy}</span>
                      <span className="department">
                        Dept: {seat.department}
                      </span>
                    </>
                  )}
                </Link>
              ))}
            </div>
          ))
        ) : (
          <p>No seats available.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
