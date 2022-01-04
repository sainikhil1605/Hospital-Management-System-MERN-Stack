import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import { AppModule } from './app.module';

const helmet = require('helmet');
dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet('no-cache'));
  const config = new DocumentBuilder()
    .setTitle('HMS API')
    .setDescription('API for Hospital Management System')
    .setVersion('1.0')
    .addBearerAuth(
      {
        description: `[just text field] Please enter token in following format: Bearer <JWT>`,
        name: 'Authorization',
        bearerFormat: 'Bearer',
        scheme: 'Bearer',
        type: 'http',
        in: 'Header',
      },
      'access-token',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.enableCors();

  await app.listen(process.env.PORT || 5000);
}
bootstrap();
