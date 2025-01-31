import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TagsSeederService } from './tags/tags-seeder.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Llamar al Seeder para insertar los tags
  const tagsSeederService = app.get(TagsSeederService);
  await tagsSeederService.seedTags(); // Ejecuta el Seeder

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
