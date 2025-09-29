import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const doc = new DocumentBuilder()
    .setTitle('API Pontos de Mídia')
    .setDescription('API REST para gerenciamento de pontos de mídia')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, doc);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
