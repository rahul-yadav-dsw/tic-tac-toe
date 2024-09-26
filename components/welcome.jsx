import React, { useEffect, useRef, useState } from "react";
import Router from "next/router";
import Head from "next/head";
import random from "../util/createRoom";
import { v4 as uuidv4 } from "uuid";

const Welcome = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ error: false, message: "working" });
  const inputRef = useRef(null);
  const [session, setSession] = useState(null);
  useEffect(() => {
    process.env.URL = window.location.origin;
    setSession(sessionStorage.getItem("session"));
    if (session) return;
    sessionStorage.setItem("session", uuidv4());
    setSession(sessionStorage.getItem("session"));
  }, [session]);
  async function playOffline() {
    // router
    await Router.push("/ttt");
  }
  async function createRoom() {
    setLoading(true);
    const room = random();
    const res = await fetch(`/api/joinroom/${room}`, {
      method: "POST",
      body: JSON.stringify({ session: session }),
    }).then((result) => result.json());
    setLoading(false);
    if (res.success) await Router.push(`/${room}`);
  }

  const openModal = () => {
    setOpen((prevState) => !prevState);
  };

  async function joinMatch() {
    const room = inputRef.current.value;
    if (room) {
      setOpen((prevState) => !prevState);
      setLoading((prevState) => !prevState);
      const result = await fetch(`/api/checkRoom/${room}`, {
        method: "POST",
      }).then((r) => r.json());

      // console.log(result);
      if (result.success) {
        const partner = result.room.partner;
        const res = await fetch(`/api/updateroom/${room}`, {
          method: "POST",
          body: JSON.stringify({
            session: session,
            player: partner === "",
          }),
        });
        const resp = await res.json();
        setLoading((prevState) => !prevState);
        if (resp.success) {
          await Router.push(`/${room}`);
          return;
        }
        setError((prevState) => ({
          ...prevState,
          error: true,
          message: "hmm",
        }));
      } else {
        setLoading((prevState) => !prevState);
        setError((prevState) => ({
          ...prevState,
          error: true,
          message: "Room Not Found",
        }));
      }
    }
  }

  return (
    <>
      <Head>
        <title>Join your match</title>
      </Head>
      <div className={"h-screen w-screen relative"}>
        {/*loading*/}
        <Loading loading={loading} />
        <Message error={error} setError={setError} />
        {/*Modal*/}
        <div
          className={`z-10 bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0 ${
            open ? "scale-100 " : "scale-0"
          }`}
        >
          <div
            className={`z-10 transition-all duration-300 bg-white px-16 py-14 rounded-md text-center ${
              open ? "scale-100 " : "scale-0"
            }`}
          >
            <h1 className="text-xl mb-4 font-bold text-slate-700">
              Enter Match code Here
            </h1>
            <input
              className={
                "transition-shadow delay-75 h-14 p-4 rounded-md shadow-md border-slate-800 border-2 outline-none focus:shadow-2xl"
              }
              ref={inputRef}
              autoComplete={"off"}
              placeholder={"Match Code..."}
              type="text"
              name="username"
            />
            <br />
            <br />
            <button
              onClick={openModal}
              className="bg-red-500 px-4 py-2 rounded-md text-md text-white"
            >
              Cancel
            </button>
            <button
              onClick={joinMatch}
              className="bg-indigo-500 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold"
            >
              Join
            </button>
          </div>
        </div>
        <div
          className={"h-full w-full flex justify-center items-center bg-white"}
        >
          <div
            className={
              "bg-white flex flex-col justify-evenly items-center lg:w-1/3 lg:h-1/2 md:w-[500px] md:h-[600px] max-h-[700px] max-w-[500px] lg:m-0 mx-3 h-[500px] w-[450px] shadow-2xl rounded-md"
            }
          >
            <h1 className={"font-semibold text-2xl"}>Welcome To tic-tac-toe</h1>

            <div className={"w-3/4 h-2/3"}>
              <div className={"h-1/3 flex justify-center items-center"}>
                <button
                  className={
                    "w-40 m-1 h-14 bg-slate-800 text-white hover:bg-white hover:text-slate-800 border-slate-700 border-2 flex justify-center items-center rounded-md shadow-md transition-all"
                  }
                  onClick={playOffline}
                >
                  Start The Game!!!!
                </button>
              </div>
              {/* <div className={"text-center"}>OR</div>
              <div className={"h-2/3 flex justify-evenly items-center"}>
                <button
                  className={
                    "w-40 m-1 h-14 bg-slate-800 text-white hover:bg-white hover:text-slate-800 border-slate-700 border-2 flex justify-center items-center rounded-md shadow-md transition-all"
                  }
                  onClick={createRoom}
                >
                  Create a Match
                </button>
                <button
                  className={
                    "w-40 h-14 bg-slate-800 text-white hover:bg-white hover:text-slate-800 border-slate-700 border-2 flex justify-center items-center rounded-md shadow-md transition-all"
                  }
                  onClick={openModal}
                >
                  Join a Match
                </button>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Welcome;

const Message = ({ error, setError }) => {
  return (
    <div
      className={`z-10 bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0 ${
        error.error ? "scale-100 " : "scale-0"
      }`}
    >
      <div
        className={`z-10 transition-all duration-300 bg-white px-16 py-14 rounded-md text-center ${
          error.error ? "scale-100 " : "scale-0"
        }`}
      >
        <h1 className={"font-medium text-3xl"}>Opps!!!</h1>
        <br />
        <h1 className={"font-medium text-xl"}>{error.message}</h1>
        <br />
        <button
          onClick={() => setError((error) => ({ ...error, error: false }))}
          className="bg-indigo-500 px-7 py-2 rounded-md text-md text-white font-semibold"
        >
          Retry
        </button>
      </div>
    </div>
  );
};

const Loading = ({ loading }) => {
  return (
    <div
      className={`z-10 bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0 ${
        loading ? "scale-100 " : "scale-0"
      }`}
    >
      <div
        className={`z-10 transition-all duration-300 bg-white px-16 py-14 rounded-md text-center ${
          loading ? "scale-100 " : "scale-0"
        }`}
      >
        <div
          className={
            "border-8 rounded-full w-28 h-28 border-slate-200 border-t-slate-700 animate-spin"
          }
        ></div>
        <br />
        <br />
        <h1 className={"font-medium text-xl"}>Joining......</h1>
      </div>
    </div>
  );
};
