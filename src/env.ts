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

  get telegramToken() {
    const token = process.env.TOKEN;

    if (!token) throw new Error("Token not found");

    return token;
  }

  get webUrl() {
    const url = process.env.WEB_URL;

    if (!url) throw new Error("Url not found.");

    return url;
  }

  get port() {
    const port = process.env.PORT;

    if (!port) throw new Error("Port not found.");

    return port;
  }
}
