import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const port = process.env.PORT || 8888;
async function start() {
  const app = await NestFactory.create(AppModule);
  await app.listen(port);
}
start();
