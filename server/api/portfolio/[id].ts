import mongoose from 'mongoose';
import { Account } from "@/utils/Client";
mongoose.connect(process.env.MONGO_DB_URI);

import models from "../../models"

const { User } = models;




export default defineEventHandler(async (event) => {
    console.log("getting request")
    let user;
    let portfolio
  try {
      user = await User.findById(event.context.params.id);
      console.log(user)
      if (user.portfolio.length === 0) {
          const account = new Account(user.seedAddress, user.networks);
          await account.init()
          portfolio = await account.getPortfolio();
          const updated = await User.findByIdAndUpdate(event.context.params.id, { portfolio })
          console.log(updated)
      } else { 
          portfolio = user.portfolio
      }
      return {
          portfolio
      }
  } catch (error) {
      return {
        portfolio : null
  }
  }
    
})