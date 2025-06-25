import { IsOptional } from 'class-validator'
import { Author } from 'src/modules/author/entities/author.entity'
import { Genre } from 'src/modules/genre/entities/genre.entity'
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Fanfic {
  @PrimaryGeneratedColumn()
  readonly id: number

  @Column()
  title: string

  @Column({ name: 'cover_url' })
  coverUrl: string

  @Column()
  excerpt: string

  @Column({ default: 0 })
  rating: number

  @Column({ default: 0 })
  likes: number

  @Column({ default: 0 })
  views: number

  @Column({ name: 'is_completed', default: false })
  isCompleted: boolean

  @Column()
  @IsOptional()
  type: string

  @Column()
  @IsOptional()
  size: string // TODO N-pages N-chapters

  @Column({ name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
  readonly createdAt: Date

  @Column({ name: 'updated_at', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date

  @Column({ type: 'text' })
  @IsOptional()
  content: string

  @Column({ type: 'text', array: true })
  @IsOptional()
  categories: string[] // TODO переделать в связь?

  @Column()
  @IsOptional()
  status: string

  @ManyToOne(() => Author, (author) => author.fanfics, { eager: true })
  author: Author

  @ManyToMany(() => Genre)
  @JoinTable()
  genres: Genre[]
}
