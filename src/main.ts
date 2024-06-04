import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { get } from 'http';
import { createWriteStream } from 'fs';

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
  SwaggerModule.setup('/swagger', app, document);

  await app.listen(process.env.PORT || 3000);

  if (process.env.NODE_ENV === 'development') {
    const serverUrl = `http://localhost:${process.env.PORT || 3000}`;

    const files = [
      'swagger-ui-bundle.js',
      'swagger-ui-init.js',
      'swagger-ui-standalone-preset.js',
      'swagger-ui.css',
      'index.html',
    ];

    files.forEach((file) => {
      get(`${serverUrl}/swagger/${file}`, function (response) {
        response.pipe(createWriteStream(`swagger-static/${file}`));
        console.log(`Swagger UI file written to: '/swagger-static/${file}'`);
      });
    });
  }
}

bootstrap();
