const express = require("express");
const router = express.Router();
const Seat = require("../models/Seat"); // 确保路径正确
const qrcode = require("qrcode"); //生成二维码数据的库

// 生成二维码并创建座位
router.post("/api/seats", async (req, res) => {
  //
  const { seatId } = req.body; // 假设前端传递座位ID
  const qrCodeData = `http://localhost:3000/book-seat/${seatId}`;
  const qrCode = await qrcode.toDataURL(qrCodeData); // 生成二维码图片的Base64数据

  const seat = new Seat({
    seatId,
    qrCode,
  });

  await seat.save();
  res.status(201).json(seat);
});

// 获取所有座位信息
router.get("/seats", async (req, res) => {
  const seats = await Seat.find();
  res.json(seats);
});

// 预约座位
router.post("/seats/:id/book", async (req, res) => {
  const { id } = req.params;
  const { bookedBy, department } = req.body;

  try {
    // 检查座位号是否在有效范围内
    const seatNumber = parseInt(id, 10);
    if (seatNumber < 1 || seatNumber > 300) {
      return res.status(404).json({ message: "Seat not found" });
    }

    // 检查座位是否存在
    const seat = await Seat.findOne({ seatId: id });
    if (!seat) {
      return res.status(404).json({ message: "Seat not found" });
    }

    // 检查座位是否已被预约
    if (seat.isBooked) {
      return res.status(400).json({ message: "Seat already booked" });
    }

    // 更新座位状态
    seat.isBooked = true;
    seat.bookedBy = bookedBy;
    seat.department = department;
    await seat.save();

    res.json(seat);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// 获取单个座位信息
router.get("/seats/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // 检查座位号是否在有效范围内
    const seatNumber = parseInt(id, 10);
    if (seatNumber < 1 || seatNumber > 300) {
      return res.status(404).json({ message: "Seat not found" });
    }

    // 查询座位信息
    const seat = await Seat.findOne({ seatId: id });
    if (!seat) {
      return res.status(404).json({ message: "Seat not found" });
    }

    res.json(seat);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// 释放座位
router.post("/seats/:id/release", async (req, res) => {
  const { id } = req.params;

  try {
    // 检查座位是否存在
    const seat = await Seat.findOne({ seatId: id });
    if (!seat) {
      return res.status(404).json({ message: "Seat not found" });
    }

    // 检查座位是否已被预约
    if (!seat.isBooked) {
      return res.status(400).json({ message: "Seat is not booked" });
    }

    // 释放座位
    seat.isBooked = false;
    seat.bookedBy = null;
    await seat.save();

    res.json(seat);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/fruit/:somefruit", (req, res) => {
  const fruit = req.params.somefruit;
  res.setHeader("Content-Type", "application/json");
  res.json({ message: `You requested the fruit: ${fruit}` });
});

module.exports = router;
