import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as express from 'express';
import { join } from 'path';
import { AppModule } from './app.module';
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json'); // Your Swagger JSON file

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Serve Swagger UI static files
  app.use(
    '/swagger-ui',
    express.static(join(__dirname, '..', 'node_modules/swagger-ui-dist')),
  );

  const config = new DocumentBuilder()
    .setTitle('Firefly Pricefeed API')
    .setDescription(
      'API documentation for Firefly DEX for CoinMarketCap listing',
    )
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document);

  await app.listen(process.env.PORT || 3000);
}

bootstrap();
