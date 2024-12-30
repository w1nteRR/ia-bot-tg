import TelegramBot, { Message, PreCheckoutQuery } from "node-telegram-bot-api";

import { IPayments } from "../types/payments.types";
import { AppConfig } from "../env";

const config = new AppConfig();

console.log('payments url', config.paymentsUrl)

export class PaymentsService implements IPayments {
  private readonly bot = new TelegramBot(new AppConfig().telegramToken, {
    polling: false,
  });
  public async handlePreCheckoutQuery(query: PreCheckoutQuery) {
    const body = {
      from: {
        id: query.from.id
      }
    }

    console.log('PRE_CHECKOUT_QUERY', body)

    try {

      const response = await fetch(`${config.paymentsUrl}/check-payment`, {
        body: JSON.stringify(body),
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const { payment_verification } = await response.json() as {payment_verification: boolean}

      console.log('RESPONSE', response.json())

      await this.bot.answerPreCheckoutQuery(query.id, payment_verification, { error_message: 'You are already subscriber. Please contact support.' });
    } catch (error) {
      console.error("Error answering pre-checkout query:", error);
      throw new Error(error as string);
    }
  }

  public async handleSuccessfulPayment(message: Message) {
    const { chat, message_id, successful_payment, date, from } = message;

    console.log("message", message);

    try {
      await fetch(`${config.paymentsUrl}/confirm-payment`, {
        body: JSON.stringify({ from, successful_payment, date  }),
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      await this.bot.sendMessage(
        chat.id,
        `Thank you for your payment! Your transaction ID is: ${message.successful_payment?.telegram_payment_charge_id}`,
        { reply_to_message_id: message_id }
      );
    } catch (error) {
      console.error("Error handle success payment:", error);

      throw new Error(error as string);
    }
  }
}
