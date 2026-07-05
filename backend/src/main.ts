// main.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist:true,
    forbidNonWhitelisted:true,
    transform:true
  }));

  app.useGlobalFilters(new HttpExceptionFilter());


  // for FRONTEND
  app.enableCors({
    origin: [
      "http://localhost:5173",
      "https://galax-o.vercel.app",
    ],
    credentials: true,
  });
  // app.enableCors({
  //   origin: process.env.CORS_ORIGINS?.split(","),
  //   credentials: true,
  // });
  // app.enableCors({ origin: "http://localhost:5173", credentials: true });
  // ................
  
  const config = new DocumentBuilder()
    .setTitle('My API')
    .setDescription('API documentation')
    .setVersion('1.0')
    .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'jwt',
      },
      'jwt-auth',
    )
    .build();


  const document = SwaggerModule.createDocument(app, config);


  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
