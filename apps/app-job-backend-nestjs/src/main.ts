import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { isProduction } from './environment/db.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  if (!isProduction()) {
    const config = new DocumentBuilder()
      .setTitle('Backend API')
      .setDescription('The Job API description')
      .setVersion('1.0')
      .addTag('backend')
      .addBearerAuth(
        {
          // I was also testing it without prefix 'Bearer ' before the JWT
          description: `[just text field] Please enter token in following format: Bearer <JWT>`,
          name: 'Authorization',
          bearerFormat: 'Bearer', // I`ve tested not to use this field, but the result was the same
          scheme: 'Bearer',
          type: 'http', // I`ve attempted type: 'apiKey' too
          in: 'Header',
        },
        'access-token', // This name here is important for matching up with @ApiBearerAuth() in your controller!
      )
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
  }
  await app.listen(3000);
}
bootstrap();
