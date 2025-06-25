import { CreateGenreDto } from '../dto/create-genre.dto'
import { UpdateGenreDto } from '../dto/update-genre.dto'
import { Genre } from '../entities/genre.entity'

export interface GenreControllerInterface {
  create(createGenreDto: CreateGenreDto): Promise<Genre>
  findAll(): Promise<Genre[]>
  findOne(id: string): Promise<Genre>
  update(id: string, updateGenreDto: UpdateGenreDto): Promise<String>
  remove(id: string): Promise<Object>
}
