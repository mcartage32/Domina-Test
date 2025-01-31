import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from './note.entity';
import { NoteRepository } from './notes.repository';
import { NoteService } from './notes.service';
import { NoteController } from './notes.controller';
import { Tag } from 'src/tags/tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Note, Tag])],
  providers: [NoteRepository, NoteService],
  controllers: [NoteController],
})
export class NotesModule {}
