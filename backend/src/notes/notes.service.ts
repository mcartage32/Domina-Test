import { Injectable, NotFoundException } from '@nestjs/common';
import { NoteRepository } from './notes.repository';
import { Note } from './note.entity';

@Injectable()
export class NoteService {
  constructor(private readonly noteRepository: NoteRepository) {}

  findAll(): Promise<Note[]> {
    return this.noteRepository.findAll();
  }

  create(note: Partial<Note>): Promise<Note> {
    return this.noteRepository.create(note);
  }

  async updateNote(id: number, partialUpdate: Partial<Note>): Promise<Note> {
    const note = await this.noteRepository.updateNote(id, partialUpdate);
    if (!note) {
      throw new NotFoundException('Note not found or not authorized');
    }
    return note;
  }

  delete(id: number): Promise<void> {
    return this.noteRepository.delete(id);
  }

  async associateTags(noteId: number, tagIds: number[]): Promise<Note> {
    return this.noteRepository.associateTags(noteId, tagIds);
  }

  async removeTagFromNote(noteId: number, tagId: number) {
    return this.noteRepository.removeTagFromNote(noteId, tagId);
  }

  async findByOne(id: number) {
    return this.noteRepository.findByOne(id);
  }
}
