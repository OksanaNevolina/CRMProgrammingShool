import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { GlobalExceptionFilter } from './common/exeptions/global-exception.filter';
import { SwaggerHelper } from './common/helpers/swagger.helper';
import { AppConfig, Config } from './configs/config.type';
import { AppModule } from './modules/app.module';

async function bootstrap() {
  // process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
  const app = await NestFactory.create(AppModule);

    app.enableCors({
        origin: 'http://localhost:3000',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    });

  const config = new DocumentBuilder()
    .setTitle('CRM Programming school API')
    .setDescription('API description')
    .setVersion('1.0.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      in: 'header',
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerHelper.setDefaultResponses(document);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      docExpansion: 'list',
      defaultModelExpandDepth: 3,
      persistAuthorization: true,
    },
  });
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidNonWhitelisted: true,
      whitelist: true,
    }),
  );
  const configService = app.get(ConfigService<Config>);
  const appConfig = configService.get<AppConfig>('app');
  await app.listen(appConfig.port, () => {
    const url = `http://${appConfig.host}:${appConfig.port}`;
    Logger.log(`Server running ${url}`);
    Logger.log(`Swagger running ${url}/docs`);
  });
}
void bootstrap();
