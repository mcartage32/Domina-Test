import { Controller, Get } from '@nestjs/common';
import { TagsService } from './tags.service';
import { Tag } from './tag.entity';

@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagsService) {}

  @Get()
  findAll(): Promise<Tag[]> {
    return this.tagService.findAll();
  }
}
