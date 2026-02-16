const mongoose = require("mongoose");

const UserTableSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    number: {
      type: String,
      required: true,
    },
    about: {
      type: String,
    },
    avatar: {
      type: String,
    },
    isProfileCompleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const UserTable =
  mongoose.models.UserTable || mongoose.model("UserTable", UserTableSchema);

const SessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserTable",
      required: true,
    },
    ip: {
      type: String,
      required: true,
    },
    userAgent: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      default: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      index: { expires: 86400 },
    },
  },
  { timestamps: true }
);

const SessionTable =
  mongoose.models.SessionTable || mongoose.model("SessionTable", SessionSchema);

const messageSchema = new mongoose.Schema({
  text: { type: String, required: true },
  sender: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const MessageTable =
  mongoose.models.MessageTable || mongoose.model("MessageTable", messageSchema);

module.exports = { UserTable, SessionTable, MessageTable };