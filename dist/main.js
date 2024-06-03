"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const { SwaggerTheme, SwaggerThemeNameEnum } = require('swagger-themes');
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Firefly Pricefeed API')
        .setDescription('API documentation for Firefly DEX for CoinMarketCap listing')
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    const theme = new SwaggerTheme();
    const options = {
        explorer: true,
        customCss: theme.getBuffer(SwaggerThemeNameEnum.DRACULA),
    };
    swagger_1.SwaggerModule.setup('api-docs', app, document, options);
    await app.listen(process.env.PORT || 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map