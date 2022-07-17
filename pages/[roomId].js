import React, { useEffect } from "react";
import OnlineBoard from "../components/onlineBoard/onlineBoard";
import io from "Socket.IO-client";

const RoomId = ({ roomId, result }) => {
  useEffect(() => {
    const session = sessionStorage.getItem("session");
    socketInitializer().catch((e) => console.log(e));
    console.log(result.room.starter === session);
    console.log(result);
  }, [result]);
  const socketInitializer = async () => {
    await fetch("/api/socket");
    const socket = io();
    socket.on("connect", () => {
      console.log("connected");
    });
  };

  return (
    <>
      <OnlineBoard />
    </>
  );
};

export default RoomId;

export async function getServerSideProps({ params }) {
  const roomId = params.roomId;

  const result = await fetch(`http://localhost:3000/api/checkRoom/${roomId}`, {
    method: "POST",
  }).then((r) => r.json());
  return {
    props: { roomId: roomId, result: result },
  };
}
