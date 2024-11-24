import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cookieParser());

app.use(express.json());
app.use(
  cors({
    origin: "https://ecm-art-manjeetmathurs-projects.vercel.app",
  })
);
import userRoutes from "./routes/userRoutes.js";
app.use("/api/user", userRoutes);


import postRouter from "./routes/post.routes.js"
app.use("/api/post",postRouter)

export { app };
//http://localhost:5173/
