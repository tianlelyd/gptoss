import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const { messages, model = "gpt-oss-120b", systemPrompt, reasoningLevel = "high" } = await req.json();
    
    if (!messages || !Array.isArray(messages)) {
      return Response.json({ error: "Invalid messages" }, { status: 400 });
    }

    // Map display model names to actual OpenAI models
    const modelMapping: Record<string, string> = {
      "gpt-oss-120b": "gpt-4-turbo-preview",
      "gpt-oss-20b": "gpt-3.5-turbo",
    };

    const actualModel = modelMapping[model] || "gpt-3.5-turbo";

    const systemMessages = [];
    
    if (systemPrompt) {
      systemMessages.push({
        role: 'system',
        content: systemPrompt
      });
    }

    const reasoningInstructions = {
      high: "Think through your response step by step. Be thorough in your reasoning.",
      medium: "Consider the key aspects of your response.",
      low: "Provide a direct response."
    };

    systemMessages.push({
      role: 'system',
      content: reasoningInstructions[reasoningLevel as keyof typeof reasoningInstructions]
    });

    const result = await streamText({
      model: openai(actualModel),
      messages: [...systemMessages, ...messages],
      temperature: 0.7,
      maxOutputTokens: 2000,
    });

    // Create a TransformStream to handle the streaming response
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        for await (const chunk of result.textStream) {
          controller.enqueue(encoder.encode(`0:"${chunk}"\n`));
        }
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
      },
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return Response.json(
      { error: "Failed to process chat request" },
      { status: 500 }
    );
  }
}