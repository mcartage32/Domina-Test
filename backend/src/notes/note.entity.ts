import { Tag } from 'src/tags/tag.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';


@Entity('notes')
export class Note {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  title: string;

  @Column('text')
  content: string;

  @Column({ default: false })
  archived: boolean;


  // @ManyToOne(() => User, (user) => user.notes, { nullable: false }) 
  // user: User; 


  @Column()
  userId: number;

  @ManyToMany(() => Tag, (tag) => tag.notes, { cascade: true })
  @JoinTable({ name: 'note_tags' }) 
  tags: Tag[];
}
