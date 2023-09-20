import TelegramBotApi from "node-telegram-bot-api";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const TOKEN = process.env.TOKEN;
const WEB_URL = process.env.WEB_URL;
const PORT = 8000;

const bot = new TelegramBotApi(TOKEN, { polling: true });
const app = express();

app.use(cors());
app.use(express.json());

bot.setChatMenuButton({
  menu_button: JSON.stringify({
    type: "web_app",
    text: "Start",
    web_app: { url: WEB_URL },
  }),
});

bot.getChatMenuButton().then((res) => {
  console.log("ChatMenuButton", res);
});

bot.addListener("web_app_data", (message) => {
  console.log("WEB APP DATA", message);
});

app.post("/add/chat", async (req, res) => {
  const { queryId } = req.body;
  console.log("QUERY", queryId);

  try {
    await bot.answerWebAppQuery(queryId, {
      type: "article",
      title: "Success",
      input_message_content: { message_text: "Good" },
    });

    res.status(200).json({});
  } catch (error) {
    console.log("e", error);
    res.status(500).json({});
  }
});

app.listen(PORT, () => {
  console.log(`Aapp listening on port ${PORT}`);
});
