import { CreateGenreDto } from '../dto/create-genre.dto'
import { UpdateGenreDto } from '../dto/update-genre.dto'
import { Genre } from '../entities/genre.entity'

export interface GenreServiceInterface {
  create(createGenreDto: CreateGenreDto): Promise<Genre>
  findAll(): Promise<Genre[]>
  findOne(id: number): Promise<Genre>
  update(id: number, updateGenreDto: UpdateGenreDto): string
  remove(id: number): Promise<Object>
}
