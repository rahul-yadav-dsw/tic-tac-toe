import connectDB from "../../../util/connectDB";

connectDB().catch((e) => {
  console.log(e);
  throw e;
});

import Room from "../../../util/model";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { joinroom } = req.query;
    const body = JSON.parse(req.body);
    const { session } = body;
    console.log(body);
    const room = await Room.findOne({ roomName: joinroom });
    if (!room) {
      const room = await Room.create({
        roomName: joinroom,
        creator: session,
        starter: session,
      });
      return res.status(201).json({ success: true, room: room });
    }
    return res.status(201).json({ success: true, room: room });
  }
  return res.status(405).json({ Error: "Method Not allowed", success: false });
}
