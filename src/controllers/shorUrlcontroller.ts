import { Request, Response } from "express";
import ShortUrl from "../models/shortUrl.model";

// URL kısaltma fonksiyonu
/*export const createShortUrl = async (
  req: Request,
  res: Response
): Promise<Response | void> => { */

export const createShortUrl = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const { destination } = req.body; // Kullanıcının gönderdiği uzun URL

    // const shortUrl = shortid.generate();
    // const newShortUrl = new ShortUrl({ destination });
    //return res.send(newShortUrl);

    if (!destination) {
      return res.status(400).json({ error: "Orijinal URL gereklidir!" });
    }

    // Yeni URL oluştur ve MongoDB'ye kaydet
    const newShortUrl = await ShortUrl.create({ destination }); // MongoDB'ye kaydediyoruz

    res.status(201).json(newShortUrl);
  } catch (error) {
    console.error("URL Kısaltma Hatası:", error);
    res.status(500).json({ error: "Sunucu hatası" });
  }
};
//export async function redirectShortUrl(req: Request, res: Response) {
export const redirectShortUrl = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const { shortID } = req.params; // Kullanıcının girdiği kısa URL kodu

    const urlDoc = await ShortUrl.findOne({ shortid: shortID }); // Kısa URL'yi MongoDB'den ara

    if (urlDoc) {
      return res.redirect(urlDoc.destination); // Uzun URL'ye yönlendir
    } else {
      return res.status(404).json({ error: "URL bulunamadı!" });
    }
  } catch (error) {
    console.error(" Yönlendirme Hatası:", error);
    res.status(500).json({ error: "Sunucu hatası" });
  }
};

export default {
  createShortUrl,
  redirectShortUrl,
};
