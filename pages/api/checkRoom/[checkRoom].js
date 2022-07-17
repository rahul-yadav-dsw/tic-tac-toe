import connectDB from "../../../util/connectDB";

connectDB().catch((e) => {
  console.log(e);
  throw e;
});

import Room from "../../../util/model";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { checkRoom } = req.query;
    const room = await Room.findOne({ roomName: checkRoom });
    if (!room) {
      return res
        .status(404)
        .json({ status: 404, success: false, message: "Room not found" });
    }
    return res.status(200).json({ status: 200, success: true, room: room });
  }
  return res.status(405).json({ Error: "Method Not allowed" });
}
