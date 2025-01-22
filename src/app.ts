import connectDB from "./db";
import express from "express";
import cors from "cors"; // Yeni sürümde cors modülü import edilir.
import bodyParser from "body-parser";
import dotenv from "dotenv";
import urlRoutes from "./routes/urlRoutes"; // Küçük harfle olmalı
import { nanoid } from "nanoid";

const urlDatabase: { [key: string]: string } = {};

dotenv.config();

const app = express();
app.use("/api", urlRoutes);
// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Express Server is Running!");
});

// **Kısaltılmış URL Oluşturma**
app.post("/shorten", (req, res) => {
  const { longUrl } = req.body;
  if (!longUrl) {
    return res.status(400).json({ error: "URL is required" });
  }

  const shortId = nanoid(6); // 6 karakterlik rastgele bir ID
  urlDatabase[shortId] = longUrl;

  res.json({ shortUrl: `http://localhost:${port}/${shortId}` });
});

// **Kısaltılmış URL'yi Gerçek URL'ye Yönlendirme**
app.get("/:shortId", (req, res) => {
  const { shortId } = req.params;
  const longUrl = urlDatabase[shortId];

  if (longUrl) {
    res.redirect(longUrl);
  } else {
    res.status(404).json({ error: "URL not found" });
  }
});

const port = process.env.PORT || 5001;
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
