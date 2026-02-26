import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./src/app.js";
import dns from "dns";
import { seedAdmin } from "./src/utils/seedAdmin.js";

dotenv.config();
dns.setServers(["1.1.1.1", "8.8.8.8"]);

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB Connected");
    await seedAdmin();

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
    });

  } catch (error) {
    console.error("Startup Error:", error);
    process.exit(1);
  }
};

startServer();