import mongoose from 'mongoose';
mongoose.connect(process.env.MONGO_DB_URI);

import models from "../../models"

const { User } = models;




export default defineEventHandler(async (event) => {
  let user;
  try {
    user = await User.findById(event.context.params.id);  
  } catch (error) {
    user = null    
  }

  return {
    user : user
  }
})