import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestApplicationOptions } from '@nestjs/common';

async function bootstrap() {
  const options: NestApplicationOptions = {
    bodyParser: false, // LINE Not SDK を利用する際に Nest デフォルトの bodyParser の設定を無効化する必要
    rawBody: false, // bodyParser を有効化したい場合に rawBody の設定を有効化
  };

  const app = await NestFactory.create(AppModule, options);
  await app.listen(3000);
}
bootstrap();
