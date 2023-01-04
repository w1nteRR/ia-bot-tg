import TelegramBotApi from "node-telegram-bot-api";
import express from "express";
import cors from "cors";

const TOKEN = "5221230117:AAEUwwsLHNSvsqzT1B4KNtGJuXQOO0lg5CQ";
const WEB_URL = "https://f2e0-91-192-182-24.eu.ngrok.io";
const PORT = 8000;

const bot = new TelegramBotApi(TOKEN, { polling: true });
const app = express();

app.use(cors());
app.use(express.json());

bot.on("message", async (message) => {
  bot.sendMessage(message.from.id, "<b>koliavtnk</b> \n Mykola Vatamaniuk", {
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Go to profile",
            web_app: {
              url: `${WEB_URL}/user/koliavtmnk`,
            },
          },
          { text: "Check stories", callback_data: "2" },
        ],
      ],
    },
  });
});

bot.setChatMenuButton({
  menu_button: JSON.stringify({
    type: "web_app",
    text: "Start App",
    web_app: { url: WEB_URL },
  }),
});

bot.getChatMenuButton().then((res) => {
  console.log("ChatMenuButton ", res);
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
