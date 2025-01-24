const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const seatRoutes = require("./routes/seats");

const app = express();
const PORT = process.env.PORT || 5000;

mongoose
  .connect("mongodb://localhost:27017/seat-booking")
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

app.use(cors());
app.use(express.json());
app.use("/api", seatRoutes);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});
