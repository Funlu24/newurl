import mongoose, { Document } from "mongoose";
import { customAlphabet } from "nanoid"; //Özel karakterlerle kısa ID oluşturmak için kullanılır.

const nanoid = customAlphabet(
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890",
  6 //buradaki 6 harfi karakter zuunlugunu belirler.
);

export interface IShortUrl extends Document {
  //aratüz alanı oluşturuldu.
  shortID: string; //kısa id
  destination: string; //kulancının girdiği url
}

const shortUrlSchema = new mongoose.Schema({
  shortid: { type: String, required: true, default: () => nanoid() },

  destination: { type: String, required: true },
});
const ShortUrl = mongoose.model<IShortUrl>("ShortUrl", shortUrlSchema); //bu kod kısa ıdleri okuyup ve veritabanına eklemke için kullanır
export default ShortUrl;
