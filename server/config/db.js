const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined in .env. Add MONGO_URI to server/.env (see .env.example).");
    }

    // Log that MONGO_URI is loaded (redact password for safety)
    const uri = process.env.MONGO_URI;
    const redacted = uri.replace(/\/\/([^:]+):([^@]+)@/, "//$1:***@");
    console.log("MONGO_URI loaded:", redacted);

    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000,
      bufferCommands: false,
    });

    const { host, name } = mongoose.connection;
    console.log(`MongoDB connected → ${host}/${name}`);
  } catch (error) {
    console.error("DB Error:", error.message);
    if (error.message.includes("ENOTFOUND") || error.message.includes("getaddrinfo")) {
      console.error("→ Check: MongoDB Atlas cluster URL and DNS. Is the cluster running?");
    }
    
    if (error.message.includes("authentication failed") || error.message.includes("auth")) {
      console.error("→ Check: Username and password in MONGO_URI. Escape special chars in password (e.g. @ → %40).");
    }
    if (error.message.includes("timed out") || error.message.includes("timeout")) {
      console.error("→ Check: IP whitelist in Atlas (Network Access). Add 0.0.0.0/0 for anywhere or your IP.");
    }
    process.exit(1);
  }
};

module.exports = connectDB;
