import OpenAI from "openai";
import { Config } from "./Config";

const openai = new OpenAI({
  apiKey: Config.CHATGPT_KEY,
  dangerouslyAllowBrowser: true,
});

export default openai;
