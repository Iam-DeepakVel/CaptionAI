import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { messages, prompt, numberOfCaptions, wordLimit } = body;

    console.log(messages);

    const instructionMessage: OpenAI.Chat.ChatCompletionMessage = {
      role: 'system',
      content: prompt
        ? prompt
        : `You are a catchy captions generator. You must generate only ${numberOfCaptions} different catchy captions. Each caption should only contain ${wordLimit} words in it. Each caption should not exceeds the wordlimit provided. Never ever mention number of words at last of each caption. Generate by using the simple caption provided here.  `,
    };

    console.log(instructionMessage);

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
    if (!openai.apiKey) {
      return new NextResponse('OpenAI API Key not configured', { status: 500 });
    }
    if (!messages) {
      return new NextResponse('Messages are required', { status: 400 });
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [instructionMessage, ...messages],
    });

    console.log(response);
    return NextResponse.json(response.choices[0].message);
  } catch (error) {
    console.log('[CONVERSATION_ERROR]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
