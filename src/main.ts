import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strips properties that do not have decorators in DTO
      forbidNonWhitelisted: true, // Throws error if non-whitelisted properties are provided
      transform: true, // Automatically transforms payloads to be objects typed according to their DTO classes
    }),
  );

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('E-commerce Project API')
    .setDescription('API documentation for my NestJS project')
    .setVersion('1.0')
    .addTag('CRUD api`s')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
