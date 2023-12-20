import { WebhookEvent } from '@line/bot-sdk';
import { ConfigService } from '@nestjs/config';
import { Controller, Post } from '@nestjs/common';
import { LINEBotService } from './linebot.service';

@Controller()
export class LINEBotController {
  constructor(
    private readonly configService: ConfigService,
    private readonly lineBotService: LINEBotService,
  ) {}

  @Post('/api/webhook')
  public async webhook(c) {
    const data = await c.req.json();
    const events: WebhookEvent[] = data.events;
    const accessToken: string = this.configService.get(
      'lineChannelAccessToken',
    );

    await Promise.all(
      events.map(async (event: WebhookEvent) => {
        try {
          await this.lineBotService.handler(event, accessToken);
        } catch (err: unknown) {
          if (err instanceof Error) {
            console.error(err);
          }
          return c.json({
            status: 'error',
          });
        }
      }),
    );
    return c.json({ message: 'ok' });
  }
}
