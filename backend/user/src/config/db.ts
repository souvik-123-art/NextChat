import mongoose from "mongoose";

const connectDb = async () => {
  const url = process.env.MONGO_URI;

  if (!url) {
    throw new Error("MONGO_URI is not defined in env");
  }
  try {
    await mongoose.connect(url, {
      dbName: "chatappmicroserviceapp",
    });
    console.log("connected to db");
  } catch (error) {
    console.error("failed to connect db", error);
    process.exit(1);
  }
};

export default connectDb;
