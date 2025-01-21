import express, { Request, Response } from "express";
import { createShortUrl } from "../controllers/shorUrlcontroller";
import { redirectShortUrl } from "../controllers/shorUrlcontroller";

const router = express.Router(); // Router oluşturuldu yonlendirmke için kullanılır.

router.post("/shorten", async (req: Request, res: Response) => {
  await createShortUrl(req, res);
});

//await createShortUrl(req, res); //endpoint   // Kullanıcının gönderdiği URL'yi kısaltan kod
//console.log(req.body); //kullanıcının girdiği url
//res.json({ error: "Hem uzun URL hem de özel kısa URL gereklidir." });

router.get("/:shortUrl", async (req, res) => {
  await redirectShortUrl(req, res); //endpoint  // Kısaltılmış URL'yi asıl URL'ye yönlendiren kod short url degişken .
  // : degişken olarak almak için kullanılır.
});
export default router;
// Bu satır, oluşturduğumuz router’ı dışa aktarmamızı sağlar.
