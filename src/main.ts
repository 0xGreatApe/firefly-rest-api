import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
const { SwaggerTheme, SwaggerThemeNameEnum } = require('swagger-themes');

import { AppModule } from './app.module';

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

  SwaggerModule.setup('api-docs', app, document, options);

  await app.listen(process.env.PORT || 3000);
}

bootstrap();
