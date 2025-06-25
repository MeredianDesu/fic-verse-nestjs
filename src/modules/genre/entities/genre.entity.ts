import { Fanfic } from 'src/modules/fanfic/entities/fanfic.entity'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Genre {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column({ name: 'cover_urls', type: 'text', array: true })
  coverUrls: string[]

  @Column({ name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
  readonly createdAt: Date

  @Column({ default: 0 })
  count: number
}
