import mongoose from "mongoose";

const connectDB = async () => {
  // mongoose.connect returns a promise that resolves once the connection is actually established
  const conn = await mongoose.connect(process.env.MONGODB_URI);
  // conn.connection.name confirms which database we ended up connected to (useful to verify the URI is correct)
  console.log(`MongoDB connected successfully: ${conn.connection.name}`);
};

export default connectDB;