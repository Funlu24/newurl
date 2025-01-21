import express from "express"; //http modülü yerine express modülü kullanılır. http olusturmka için kullanılır. //request istekleri response ise cevapları temsil eder.
import { Request, Response } from "express";
import cors from "cors"; // Yeni sürümde cors modülü import edilir.
import connectDB from "./db";
import dotenv from "dotenv";
import urlRoutes from "./routes/urlRoutes"; // Küçük harfle olmalı

const app = express();
app.use(cors()); // Middleware kullanımı frontende bacekend arasında veri alışverişi yaparken kullanılır.
app.use(express.json()); // json veri tabanının req.body olarak okunmasını sağlar.
app.use("/shorten", urlRoutes);

const urlDatabase: Record<string, string> = {}; //url kayıt etmek için

/*app.post("/shorten", (req, res) => {
  // app logıc
  console.log(req.body); //kullanıcının girdiği url
  res.json({ error: "Hem uzun URL hem de özel kısa URL gereklidir." });
*/
/*
  if (urlDatabase[customShortUrl]) {
    return res.status(400).json({
      error:
        "Bu kısa URL zaten kullanılıyor. Lütfen farklı bir kısa URL seçin.",
    });
  }

  urlDatabase[customShortUrl] = originalUrl;

  res.json({ shortUrl: customShortUrl });
});
*/
app.post("/shorten", (req: Request, res: Response) => {
  const { originalUrl, customShortUrl } = req.body; // Kullanıcıdan gelen veriyi al

  if (!originalUrl) {
    res.status(400).json({ error: "Uzun URL gereklidir." });
  }

  if (urlDatabase[customShortUrl]) {
    res.status(400).json({ error: "Bu kısa URL zaten kullanılıyor!" });
  }

  urlDatabase[customShortUrl] = originalUrl;

  res.json({ shortUrl: customShortUrl });
});

app.get("/:shortUrl", (req: Request, res: Response) => {
  const { shortUrl } = req.params; // Kullanıcının girdiği kısa URL alınır.
  const originalUrl = urlDatabase[shortUrl]; // Kaydedilen uzun URL bulunur.

  if (originalUrl) {
    res.redirect(originalUrl); // Kullanıcıyı uzun URL'ye yönlendir.
  } else {
    res.status(404).json({ error: "URL not found" });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
