"use client";
import { Send } from "lucide-react";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

export default function Chat({ email }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
  socket.emit("register", email); // join room with your email

  socket.on("chat message", (msg) => {
    setMessages((prev) => [...prev, msg]);
  });

  return () => socket.off("chat message");
}, [email]);

const sendMessage = () => {
  if (!input.trim()) return;

  const message = {
    text: input,
    sender: email,
    receiver: "target@email.com" // correct spelling
  };

  socket.emit("chat message", message);
  setInput("");
};


  // const sendMessage = () => {
  //   if (!input.trim()) {
  //     console.log("Empty message, not sending");
  //     return;
  //   }

  //   const message = {
  //     text: input,
  //     sender: email || "unknown", 
  //     reciever: "target@email.com"
  //   };
  //   console.log("Sending message:", message);
  //   socket.emit("chat message", message);
  //   setInput("");
  // };

  return (
    <div>
      <ul className={`flex flex-col ${messages.sender===email? "bg-red-500": "bg-pink-400 rounded-br-2xl"}`}>
        {messages.map((m, i) => (
          <li
            key={i}
            style={{
              textAlign: m.sender === email ? "right" : "",
              background: m.sender === email ? "#DCF8C6" : "#FFF",
              margin: "5px",
              padding: "8px",
              borderRadius: "5px",
              maxWidth: "100%",
              float: m.sender === email? "right": "left"
            }}
            className=""
          >
            {m.text}
            <div style={{ fontSize: "0.7em", color: "#ccc" }}>
              {new Date(m.createdAt).toLocaleTimeString()}
            </div>
          </li>
        ))}
      </ul>
        <div className="absolute mx-auto left-0 rounded-full bg-[#f5fffe] h-10 bottom-10 w-full flex items-center justify-between px-5">

      <input className="w-full h-full outline-0 border-0 text-xl font-medium"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message"
        />
      <button className="hover:bg-[gray] p-2 rounded-md" onClick={sendMessage}><Send /></button>
        </div>
    </div>
  );
}
