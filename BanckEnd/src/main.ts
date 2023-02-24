import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from  '@nestjs/swagger';
//import { AtGuard } from './auth/guards';
//import { Reflector } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //const reflactor = new Reflector();
  //app.useGlobalGuards(new AtGuard(reflactor));

  const config = new DocumentBuilder()
    .setTitle('Banco Digital')
    .setDescription('Realizar transferência bancária')
    .setVersion('1.0')
    .build();
  
  const document =  SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors()
  app.useGlobalPipes(
    new ValidationPipe({
    transform: true,
    // whitelist: true,
    // forbidNonWhitelisted: true
  }));

  await app.listen(process.env.HTTP_PORT || 7777);
}
bootstrap();
