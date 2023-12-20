import { WebhookEvent } from '@line/bot-sdk';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LINEBotService {
  public async handler(event: WebhookEvent, accessToken: string) {
    if (event.type !== 'message' || event.message.type !== 'text') {
      return;
    }

    const { replyToken } = event;

    await fetch('https://api.line.me/v2/bot/message/reply', {
      body: JSON.stringify({
        replyToken: replyToken,
        messages: [
          {
            type: 'text',
            text: event.message,
          },
        ],
      }),
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });
    return 'Hello World!';
  }
}
