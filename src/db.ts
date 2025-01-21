import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_DB = process.env.MONGO_DB;

if (!MONGO_DB) {
  throw new Error("MONGO_DB environment variable is not defined");
}

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_DB); // Yeni sürümde bu şekilde kullanılıyor.
    console.log("MongoDB Bağlantısı Başarılı!");
  } catch (error) {
    console.error("MongoDB Bağlantı Hatası:", error);
    process.exit(1);
  }
};

export default connectDB;
