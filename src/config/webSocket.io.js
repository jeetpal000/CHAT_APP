import { Server } from "socket.io";
import { MessageTable } from "../feature/model/Schema";
import CreateServer from "../lib/db";

let io;

function initSocket(server) {
  io = new Server(server, {
    cors: { origin: "http://localhost:3000" },
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // Register user by email -> join a room
    socket.on("register", (userEmail) => {
      socket.join(userEmail);
      console.log(`${userEmail} joined their room`);
    });

    socket.on("chat message", async (msg) => {
      try {
        console.log("📨 Received message:", msg);

        await CreateServer(); // connect DB

        // Save message
        const newMessage = await MessageTable.create({
          text: msg.text,
          sender: msg.sender,
          receiver: msg.receiver, // add receiver field
        });

        console.log("💾 Saved:", newMessage);

        // Send only to receiver + echo back to sender
        io.to(msg.receiver).emit("chat message", {
          text: newMessage.text,
          sender: newMessage.sender,
          createdAt: newMessage.createdAt,
        });

        io.to(msg.sender).emit("chat message", {
          text: newMessage.text,
          sender: newMessage.sender,
          createdAt: newMessage.createdAt,
        });
      } catch (error) {
        console.error("❌ Error:", error.message);
        socket.emit("error", { message: "Failed to save", error: error.message });
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });

  return io;
}

function getIO() {
  if (!io) throw new Error("Socket.io not initialized!");
  return io;
}

module.exports = { initSocket, getIO };
