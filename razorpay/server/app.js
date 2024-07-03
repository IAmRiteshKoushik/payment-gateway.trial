import express from "express";
import cors from "cors";
import { config } from "dotenv";
config({ path: "./config/config.env" })

import router from "./routes/paymentRoutes.js";

export const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

app.use("/api/getkey", (req, res) => {
    res.status(200).json({
        key: process.env.RAZORPAY_API_KEY
    })
});
