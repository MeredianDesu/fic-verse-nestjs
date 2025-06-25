import { Genre } from 'src/modules/genre/entities/genre.entity'

export class CreateFanficDto {
  title: string
  coverUrl: string
  excerpt: string
  type: string
  content: string
  categories: string[] // TODO переделать в связь?
  genres: Genre[]
}
