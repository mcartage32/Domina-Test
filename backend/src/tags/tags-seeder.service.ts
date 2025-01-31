import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from './tag.entity';

@Injectable()
export class TagsSeederService {
  constructor(
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
  ) {}

  async seedTags() {
    const tags = [
      { name: 'categoria 1' },
      { name: 'categoria 2' },
      { name: 'categoria 3' },
    ];

    // Verifica si las etiquetas ya existen y, si no, las inserta
    for (const tag of tags) {
      const existingTag = await this.tagRepository.findOne({
        where: { name: tag.name },
      });
      if (!existingTag) {
        await this.tagRepository.save(tag);
      }
    }
  }
}
