import { NestFactory } from '@nestjs/core';
import { AppModule } from './app';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // アプリケーション作成に失敗した場合は例外を投げる
    abortOnError: false,
  });
  await app.listen(3000);
}
bootstrap();
