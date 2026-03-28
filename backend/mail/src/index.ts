import express from "express";
const app = express();
import dotenv from "dotenv";
import { startSendOtpConsumer } from "./consumer.js";
dotenv.config();
startSendOtpConsumer();
app.listen(process.env.PORT, () => {
  console.log(`mail server is running on port:${process.env.PORT}`);
});
