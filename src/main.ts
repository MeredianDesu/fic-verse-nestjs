import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors({
    origin: ['http://localhost:5173/'],
    method: ['GET', 'POST', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true,
  })

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Ficverse API')
    .setDescription('API documentation for Ficverse')
    .setVersion('1.0')
    .build()
  const swagger = () => SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup('api', app, swagger)

  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
