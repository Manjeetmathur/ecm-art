import dotenv from "dotenv";
import connectDb from "./db/db.js";
dotenv.config({ path: "./.env" });
console.log("hii . . .");

connectDb()
  
//git push success