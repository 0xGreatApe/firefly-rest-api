import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path';
import * as express from 'express';
import * as swaggerUi from 'swagger-ui-express';

const { SwaggerTheme, SwaggerThemeNameEnum } = require('swagger-themes');

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Serve static assets
  app.useStaticAssets(path.join(__dirname, '..', 'public'));
  app.setBaseViewsDir(path.join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

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
  app.use('/', swaggerUi.serve, swaggerUi.setup(document, options));

  await app.listen(process.env.PORT || 3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
