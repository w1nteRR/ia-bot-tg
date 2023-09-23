import express from "express";
import cors from "cors";

import { Bot } from "./bot";
import { AppConfig } from "./env";

const config = new AppConfig();

const app = express();

app.use(cors());
app.use(express.json());

const bot = new Bot(config.telegramToken);
bot.initializeWebApp(config.webUrl);

app.listen(config.port, () => {
  console.log(`App listening on port ${config.port}`);
});
