import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from './tag.entity';
import { TagRepository } from './tags.repository';
import { TagsService } from './tags.service';
import { TagsSeederService } from './tags-seeder.service';
import { TagController } from './tags.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Tag])],
  providers: [TagRepository, TagsService, TagsSeederService], // Agrega el TagsSeederService
  controllers: [TagController],
})
export class TagsModule {}
