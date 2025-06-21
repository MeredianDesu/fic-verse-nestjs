import { CreateGenreDto } from '../dto/create-genre.dto'
import { UpdateGenreDto } from '../dto/update-genre.dto'

export interface GenreServiceInterface {
  create(createGenreDto: CreateGenreDto): string
  findAll(): string
  findOne(id: number): string
  update(id: number, updateGenreDto: UpdateGenreDto): string
  remove(id: number): string
}
