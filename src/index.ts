import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { Bot } from "./bot";

dotenv.config();

const environment = process.env.NODE_ENV || "development";
dotenv.config({ path: `.env.${environment}` });

const WEB_URL = process.env.WEB_URL;
const PORT = process.env.PORT;
const TOKEN = process.env.TOKEN;

const app = express();

app.use(cors());
app.use(express.json());

const bot = new Bot(TOKEN as string);
bot.initializeWebApp(WEB_URL as string);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
