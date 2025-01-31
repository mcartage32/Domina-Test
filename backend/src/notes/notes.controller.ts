import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Put,
  ParseIntPipe,
} from '@nestjs/common';
import { NoteService } from './notes.service';
import { Note } from './note.entity';

@Controller('notes')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Get()
  findAll(): Promise<Note[]> {
    return this.noteService.findAll();
  }

  @Get(':id')
  findByOne(@Param('id', ParseIntPipe) id: number): Promise<Note> {
    return this.noteService.findByOne(id);
  }

  @Post()
  create(@Body() note: Partial<Note>): Promise<Note> {
    return this.noteService.create(note);
  }

  @Put(':id')
  async updateNote(
    @Param('id', ParseIntPipe) id: number,
    @Body() partialUpdate: Partial<Note>,
  ): Promise<Note> {
    return this.noteService.updateNote(id, partialUpdate);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.noteService.delete(id);
  }

  @Post(':id/tags')
  async associateTags(
    @Param('id', ParseIntPipe) noteId: number,
    @Body('tagIds') tagIds: number[],
  ) {
    return this.noteService.associateTags(noteId, tagIds);
  }

  @Delete(':id/tags/:tagId')
  async removeTagFromNote(
    @Param('id') noteId: number,
    @Param('tagId') tagId: number,
  ) {
    return this.noteService.removeTagFromNote(noteId, tagId);
  }
}
