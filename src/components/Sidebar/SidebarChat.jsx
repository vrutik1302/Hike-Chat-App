import React, { useEffect, useState } from "react";
import "./SidebarChat.css";
import { Avatar } from "@material-ui/core";
import db from "../../firebase-config";
import { Link } from "react-router-dom";
const SidebarChat = ({ id, name, addNewChat }) => {
  const [seed, setSeed] = useState("");
  const [messages, setMessages] = useState("");
  useEffect(() => {
    if (id) {
      db.collection("message-room")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [id]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  const createChat = () => {
    const roomName = prompt("Please enter name for chat room");
    if (roomName) {
      // do some database code
      db.collection("message-room").add({
        name: roomName,
      });
    }
  };
  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="sidebarChat">
        {/* <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} /> */}
        <Avatar src={`https://i.pravatar.cc/500/${seed}`} />
        <div className="sidebarChat__info">
          <h2>{name}</h2>

          <p>{messages[0]?.message}</p>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChat} className="sidebarChat">
      <h2>Add New chat </h2>
    </div>
  );
};

export default SidebarChat;
