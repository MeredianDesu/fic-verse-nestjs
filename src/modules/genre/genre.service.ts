import {
  ConflictException,
  HttpStatus,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common'
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

  async create(createGenreDto: CreateGenreDto) {
    const isGenreExist = await this.genreRepository.exists({ where: { title: createGenreDto.title } })

    if (isGenreExist) {
      throw new ConflictException('Genre already exist.')
    }

    const genre = this.genreRepository.create(createGenreDto)

    return await this.genreRepository.save(genre)
  }

  async findAll() {
    return await this.genreRepository.find()
  }

  async findOne(id: number) {
    try {
      const oneGenre = await this.genreRepository.findOneOrFail({ where: { id: id } })

      return oneGenre
    } catch (error) {
      throw new NotFoundException('Genre not found.')
    }
  }

  update(id: number, updateGenreDto: UpdateGenreDto) {
    return `This action updates a #${id} genre`
  }

  async remove(id: number) {
    try {
      const oneGenre = await this.genreRepository.findOneOrFail({ where: { id: id } })
      await this.genreRepository.remove(oneGenre)

      return { message: 'Genre removed.', statusCode: 200 }
    } catch (error) {
      throw new NotFoundException('Genre not found.')
    }
  }
}
