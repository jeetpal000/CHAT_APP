import mongoose from "mongoose";

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
    avatar:{
      type: String,
    },
    isProfileCompleted: {
    type: Boolean,
    default: false
  }
  },
  
  { timestamps: true },
);

export const UserTable = mongoose.models.UserTable || mongoose.model("UserTable", UserTableSchema);

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
  { timestamps: true },
);

export const SessionTable =
  mongoose.models.SessionTable || mongoose.model("SessionTable", SessionSchema);
