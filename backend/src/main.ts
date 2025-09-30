import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  });

  const doc = new DocumentBuilder()
    .setTitle('API Pontos de Mídia')
    .setDescription('API REST para gerenciamento de pontos de mídia')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, doc);
  SwaggerModule.setup('doc', app, document);

  await app.listen(5000);
}
bootstrap().catch((err) => {
  console.error('Error starting application:', err);
  process.exit(1);
});
