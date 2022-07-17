import mongoose from "mongoose";
const connection = {};

const connectDB = async () => {
  if (connection.isConnected) return;
  const db = await mongoose.connect(process.env.DB);
  connection.isConnected = db.connections[0];
};
export default  connectDB;
