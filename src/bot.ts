import TelegramBot from "node-telegram-bot-api";
import { IBot } from "./types/bot.types";

export class Bot implements IBot {
  private bot: TelegramBot;

  constructor(token: string) {
    this.bot = new TelegramBot(token, { polling: true });
  }

  public initializeWebApp(url: string) {
    this.bot.setChatMenuButton({
      //@ts-ignore
      menu_button: JSON.stringify({
        type: "web_app",
        text: "Start Bot",
        web_app: {
          url,
        },
      }),
    });
  }
}
