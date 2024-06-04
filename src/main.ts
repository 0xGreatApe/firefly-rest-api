import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as express from 'express';
import * as swaggerUi from 'swagger-ui-express';

const { SwaggerTheme, SwaggerThemeNameEnum } = require('swagger-themes');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Firefly Pricefeed API')
    .setDescription(
      'API documentation for Firefly DEX for CoinMarketCap listing',
    )
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  const theme = new SwaggerTheme();
  const options = {
    explorer: true,
    customCss: theme.getBuffer(SwaggerThemeNameEnum.DRACULA),
  };

  // Serve Swagger UI using swagger-ui-express
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(document, options));

  await app.listen(process.env.PORT || 3000);
}

bootstrap();
