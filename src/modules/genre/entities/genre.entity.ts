import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Genre {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column('text', { array: true })
  coverUrls: string[]

  @Column()
  count: number
}
