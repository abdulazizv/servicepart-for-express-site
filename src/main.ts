import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
const port = process.env.PORT || 8888;
async function start() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  app.use((req, res, next) => {
    const startTime = Date.now();
    res.on('finish', () => {
      const endTime = Date.now();
      const responseTime = endTime - startTime;
      console.log(
        `${req.method} ${req.originalUrl} ${res.statusCode} ${responseTime}ms`,
      );
    });
    next();
  });
  await app.listen(port, () => {
    console.log(`Server has been running at ${port}`);
  });
}
start();
