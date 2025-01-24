// 这段代码定义了一个 座位信息模型，用于存储和管理座位的唯一标识、预约状态、
// 预约人信息、所属部门以及二维码数据。通过 Mongoose 模型，
// 可以轻松地对 MongoDB 中的相关数据进行增删改查操作。

const mongoose = require("mongoose");

const seatSchema = new mongoose.Schema({
  seatId: { type: String, required: true, unique: true }, // 座位号，必填且唯一
  isBooked: { type: Boolean, default: false }, // 是否被预约，默认值为 false
  bookedBy: { type: String, default: null }, // 预约者姓名，默认值为 null
  department: { type: String, default: null }, // 部门名称，默认值为 null
  qrCode: { type: String, required: true }, // 二维码数据，必填
});

module.exports = mongoose.model("Seat", seatSchema);
