import { Chapter } from 'src/modules/chapter/entities/chapter.entity'
import { Fanfic } from 'src/modules/fanfic/entities/fanfic.entity'
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Page {
  @PrimaryGeneratedColumn()
  readonly id: number

  @Column({ type: 'text' })
  content: string

  @Column({ name: 'page_number', default: 0 })
  pageNumber: number

  @Column({ name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
  readonly createdAt: Date

  @Column({ name: 'updated_at', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date

  @ManyToOne(() => Chapter, (chapter) => chapter.pages)
  chapter: Chapter
}
