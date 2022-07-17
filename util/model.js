import mongoose from "mongoose";

const Room_Schema = new mongoose.Schema({
  roomName: { type: "string", required: true, unique: true },
  creator: String,
  partner: { type: String, default: "" },
  viewers: [String],
  participant: { type: Number, default: 0 },
  starter: String,
});
const Room = mongoose.models.Room || mongoose.model("Room", Room_Schema);
export default Room;
