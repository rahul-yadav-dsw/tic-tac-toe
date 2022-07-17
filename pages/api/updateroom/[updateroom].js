import connectDB from "../../../util/connectDB";

connectDB().catch((e) => {
  console.log(e);
  throw e;
});

import Room from "../../../util/model";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { updateroom } = req.query;
    const { session, player } = JSON.parse(req.body);
    const room = await Room.findOne({ roomName: updateroom });
    if (!room) {
      return res.status(404).json({ success: false, error: "Room not found" });
    }
    if (player && room.partner === "") {
      await room.set({ partner: session });
      await room.save();
      return res.status(200).json({ success: true, room: room });
    }
    room.viewers.push(session);
    await room.save();
    return res.status(200).json({ success: true, room: room });
  }
  return res.status(405).json({ success: false, Error: "Method Not allowed" });
}
