import mongoose from 'mongoose';
mongoose.connect(process.env.MONGO_DB_URI);

import models from "../models"

const { User } = models;


export default defineEventHandler(async (event) => {
  const users = await User.find();
  return {
    users : users
  }
})