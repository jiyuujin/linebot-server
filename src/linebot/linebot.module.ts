import { middleware as LineMiddleware, MiddlewareConfig } from '@line/bot-sdk';
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { LINEBotController } from './linebot.controller';
import { LINEBotService } from './linebot.service';

@Module({
  imports: [],
  controllers: [LINEBotController],
  providers: [LINEBotService],
})
export class LINEBotModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    const lineConfig: MiddlewareConfig = {
      channelSecret: process.env.LINE_CHANNEL_SECRET,
      channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
    };

    consumer.apply(LineMiddleware(lineConfig)).forRoutes(LINEBotController);
  }
}
