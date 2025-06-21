import { Inject, Injectable } from '@nestjs/common'
import { CreateGenreDto } from './dto/create-genre.dto'
import { UpdateGenreDto } from './dto/update-genre.dto'
import { GenreServiceInterface } from './interfaces/genre.service.interface'
import { Repository } from 'typeorm'
import { Genre } from './entities/genre.entity'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class GenreService implements GenreServiceInterface {
  constructor(
    @InjectRepository(Genre)
    private genreRepository: Repository<Genre>,
  ) {}

  create(createGenreDto: CreateGenreDto) {
    return 'This action adds a new genre'
  }

  findAll() {
    return `This action returns all genre`
  }

  findOne(id: number) {
    return `This action returns a #${id} genre`
  }

  update(id: number, updateGenreDto: UpdateGenreDto) {
    return `This action updates a #${id} genre`
  }

  remove(id: number) {
    return `This action removes a #${id} genre`
  }
}
