import TelegramBot from "node-telegram-bot-api";
import { IBot } from "./types/bot.types";

export class Bot implements IBot {
  private bot: TelegramBot;

  constructor(token: string) {
    this.bot = new TelegramBot(token, { polling: true });
  }

  public initializeWebApp(url: string) {
    this.bot.setChatMenuButton({
      menu_button: {
        type: "web_app",
        text: "Run Bot",
        web_app: {
          url,
        },
      },
    });
  }
}
