import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import {connectToSocket} from "./controllers/socketManager.js";
import { createServer } from "node:http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
const server = createServer(app);
const io = connectToSocket(server);

app.set("port", process.env.PORT || 8000);

app.get("/home", (req, res) => {
  return res.json({ hello: "world" });
});
;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("CONNECTED TO DB");

    server.listen(app.get("port"), () => {
      console.log(`LISTENING ON PORT ${app.get("port")}`);
    });
  })
  .catch((err) => console.log(err));
