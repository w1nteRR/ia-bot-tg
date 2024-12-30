import {Message, PreCheckoutQuery} from "node-telegram-bot-api";

export interface IPayments {
    handlePreCheckoutQuery: (query: PreCheckoutQuery) => Promise<void>
    handleSuccessfulPayment: (message: Message) => Promise<void>
}
