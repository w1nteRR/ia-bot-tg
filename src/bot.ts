import TelegramBot from "node-telegram-bot-api";
import { IBot } from "./types/bot.types";
import { AppConfig } from "./env";
import { PaymentsService } from "./payments/payments.service";

export class Bot implements IBot {
  public bot: TelegramBot;
  private readonly token = new AppConfig().telegramToken;
  private readonly payments = new PaymentsService();

  constructor(polling: boolean) {
    this.bot = new TelegramBot(this.token, { polling });
  }

  public initializeWebApp(url: string) {
    void this.bot.setChatMenuButton({
      //@ts-ignore
      menu_button: JSON.stringify({
        type: "web_app",
        text: "Run Bot",
        web_app: {
          url,
        },
      }),
    });
  }

  public listeners() {
    this.bot.on(
      "pre_checkout_query",
      async (query) => await this.payments.handlePreCheckoutQuery(query)
    );
    this.bot.on(
      "successful_payment",
      async (message) => await this.payments.handleSuccessfulPayment(message)
    );
  }
}
