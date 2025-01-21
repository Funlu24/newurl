import connectDB from "./db";
import express from "express";
import cors from "cors"; // Yeni sürümde cors modülü import edilir.
import dotenv from "dotenv";
import urlRoutes from "./routes/urlRoutes"; // Küçük harfle olmalı

dotenv.config();

const app = express();
app.use("/api", urlRoutes);

const port = process.env.PORT || 5001;
// Middleware
app.use(cors());
app.use(express.json());

const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

//connectDB();
connectDB();

process.on("unhandledRejection", (reason, p) => {
  //async fonksiyon çalısırken hata alırsa uygulamam çökmememsi için.
  console.error("Unhandled Rejection at: Promise", p, "reason:", reason); //Reason sebebinin verir. //p promise objesi temsil eder
  server.close(() => process.exit(1)); //bu kod yakalanmıs hataları tutar ve uygulamayı kapatır.
});
process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error); //bu kod yakalanmamıs hataları tutar ve uygulamayı kapatır.
  server.close(() => process.exit(1)); //1 hatayı temsil eder hata ile kapatıldı
}); //0 basarılı // 2 ise yanlıs sistem çagrısı
