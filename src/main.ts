import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

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
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
