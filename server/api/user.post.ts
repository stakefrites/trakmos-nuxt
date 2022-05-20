import mongoose from 'mongoose';
mongoose.connect(process.env.MONGO_DB_URI);

import models from "../models"

const { User } = models;

const createUser = async (u: User) => { 
  const createdUser = User.findOneAndUpdate({ hash: u.hash }, u, { upsert: true, new: true });
  return createdUser;
}




export default defineEventHandler(async (event) => {
  const body = await useBody(event)

  console.log(body)

  const userParam: User = body;

  const user = await createUser(userParam);
  return {
    user: user
  }
})