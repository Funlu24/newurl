//import { AnyObjectSchema } from "yup";
import express from "express";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // Frontend'in çalıştığı adresi belirt
    methods: ["GET", "POST"], // Sadece GET ve POST metodlarına izin ver
    allowedHeaders: ["Content-Type"], // Sadece belirli başlıklara izin ver
  })
);
