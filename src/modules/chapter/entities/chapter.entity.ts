import { Fanfic } from 'src/modules/fanfic/entities/fanfic.entity'
import { Page } from 'src/modules/page/entities/page.entity'
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Chapter {
  @PrimaryGeneratedColumn()
  readonly id: number

  @Column()
  title: string

  @Column({ type: 'text' })
  excerpt: string

  @Column({ name: 'page_count' })
  pageCount: string

  @Column({ name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
  readonly createdAt: Date

  @Column({ name: 'updated_at', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date

  @OneToMany(() => Page, (page) => page.chapter)
  pages: Page[]

  @ManyToOne(() => Fanfic, (fanfic) => fanfic.chapters)
  fanfic: Fanfic
}
