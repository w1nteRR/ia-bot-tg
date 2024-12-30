import dotenv from "dotenv";

export class AppConfig {
  private environment = process.env.NODE_ENV || "development";

  constructor() {
    dotenv.config();
    this.loadConfig();
  }

  private loadConfig() {
    dotenv.config({ path: `.env.${this.environment}` });
  }

  get telegramToken(): string {
    const token = process.env.TOKEN;

    if (!token) throw new Error("Token not found");

    return token;
  }

  get webUrl(): string {
    const url = process.env.WEB_URL;

    if (!url) throw new Error("Url not found.");

    return url;
  }

  get port(): string {
    const port = process.env.PORT;

    if (!port) throw new Error("Port not found.");

    return port;
  }

  get paymentsUrl(): string {
    const paymentsUrl = process.env.PAYMENTS_SERVICE_URL

    if(!paymentsUrl) throw new Error('Payments URL not found.')

    return paymentsUrl
  }

  get subscribersUrl(): string {
    const subscribersUrl = process.env.SUBSCRIBERS_SERVICE_URL

    if(!subscribersUrl) throw new Error('Subscribers URL not found.')

    return subscribersUrl
  }
}
