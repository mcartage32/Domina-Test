import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Note } from './note.entity';
import { Tag } from 'src/tags/tag.entity';

@Injectable()
export class NoteRepository {
  constructor(
    @InjectRepository(Note)
    private readonly noteRepository: Repository<Note>,
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  async findAll(): Promise<Note[]> {
    return this.noteRepository.find({ relations: ['tags'] });
  }

  async findByOne(id: number): Promise<Note> {
    const note = await this.noteRepository.findOne({
      where: { id },
      relations: ['tags'],
    });
    if (!note) {
      throw new NotFoundException('Note not found');
    }
    return note;
  }

  async create(note: Partial<Note>): Promise<Note> {
    return this.noteRepository.save(note);
  }

  async updateNote(id: number, partialUpdate: Partial<Note>): Promise<Note> {
    const result = await this.noteRepository.update(id, partialUpdate);

    if (result.affected === 0) {
      throw new NotFoundException('Note not found');
    }

    const updatedNote = await this.noteRepository.findOne({
      where: { id },
      relations: ['tags'],
    });
    if (!updatedNote) {
      throw new NotFoundException('Note not found');
    }

    return updatedNote;
  }

  async delete(id: number): Promise<void> {
    const result = await this.noteRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Note not found');
    }
  }

  async associateTags(noteId: number, tagIds: number[]): Promise<Note> {
    const note = await this.noteRepository.findOne({
      where: { id: noteId },
      relations: ['tags'],
    });

    if (!note) {
      throw new NotFoundException('Note not found');
    }

    const tags = await this.tagRepository.findByIds(tagIds);
    if (tags.length !== tagIds.length) {
      throw new NotFoundException('One or more tags not found');
    }

    note.tags = [...note.tags, ...tags];

    return this.noteRepository.save(note);
  }

  async removeTagFromNote(noteId: number, tagId: number): Promise<Note> {
    const note = await this.noteRepository.findOne({
      where: { id: noteId },
      relations: ['tags'],
    });

    if (!note) {
      throw new NotFoundException('Note not found');
    }

    const tagToRemove = note.tags.find((tag) => tag.id === Number(tagId));
    if (!tagToRemove) {
      throw new NotFoundException('Tag not associated with the note');
    }

    note.tags = note.tags.filter((tag) => tag.id !== Number(tagId));

    return this.noteRepository.save(note);
  }
}
