import {
  LanguageModel,
  generateText,
} from "ai";
import { respData, respErr } from "@/lib/resp";
import { openai } from "@ai-sdk/openai";

export async function POST(req: Request) {
  try {
    const { prompt, provider, model } = await req.json();
    if (!prompt || !provider || !model) {
      return respErr("invalid params");
    }

    let textModel: LanguageModel;

    switch (provider) {
      case "openai":
        textModel = openai(model);
        break;
      default:
        return respErr("invalid provider");
    }

    const { text, warnings } = await generateText({
      model: textModel,
      prompt: prompt,
    });

    if (warnings && warnings.length > 0) {
      console.log("gen text warnings:", provider, warnings);
      return respErr("gen text failed");
    }

    return respData({
      text: text,
    });
  } catch (err) {
    console.log("gen text failed:", err);
    return respErr("gen text failed");
  }
}