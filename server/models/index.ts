import mongoose from "mongoose";


const userSchema = new mongoose.Schema<User>({
  seedAddress: {required: true, type: String},
  networks: {type: [String], required:  true},
  keys: { type: [String], required: true },
  created: { type: Date, default: Date.now },
  currency: { type: String, default: "usd" },
  lastFetch: { type: Date },
  portfolio: Array,
  hash: { type: String }
});

const User = mongoose.model<User>("User", userSchema);

const models = {
  User,
};

export default models;
