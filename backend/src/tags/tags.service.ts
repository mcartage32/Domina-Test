import { Injectable, NotFoundException } from '@nestjs/common';
import { TagRepository } from './tags.repository';
import { Tag } from './tag.entity';

@Injectable()
export class TagsService {
  constructor(private readonly tagRepository: TagRepository) {}

  findAll(): Promise<Tag[]> {
    return this.tagRepository.findAll();
  }
}
