import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { CreateAuthorDto } from './dto/create-author.dto'
import { UpdateAuthorDto } from './dto/update-author.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Author } from './entities/author.entity'
import { Repository } from 'typeorm'
import { AuthorServiceInterface } from './interfaces/author.service.interface'

@Injectable()
export class AuthorService implements AuthorServiceInterface {
  constructor(
    @InjectRepository(Author)
    private authorRepository: Repository<Author>,
  ) {}

  async create(createAuthorDto: CreateAuthorDto) {
    const isUserExist = await this.authorRepository.exists({
      where: [
        {
          email: createAuthorDto.email,
        },
        {
          name: createAuthorDto.name,
        },
      ],
    })

    if (isUserExist) {
      throw new ConflictException('User already exist.')
    }

    const newUser = new Author()
    newUser.name = createAuthorDto.name
    newUser.email = createAuthorDto.email
    newUser.password = createAuthorDto.password
    newUser.avatar = createAuthorDto.avatar
    newUser.coverUrl = createAuthorDto.coverUrl
    newUser.about = createAuthorDto.about

    try {
      const author = await this.authorRepository.save(newUser)

      return `Author ${author.name} created.`
    } catch (error) {
      console.error(`Failed to create author: ${error}`)

      throw new InternalServerErrorException('Failed to create author. Please try again later.')
    }
  }

  findAll() {
    return `This action returns all author`
  }

  findOne(id: number) {
    return `This action returns a #${id} author`
  }

  update(id: number, updateAuthorDto: UpdateAuthorDto) {
    return `This action updates a #${id} author`
  }

  remove(id: number) {
    return `This action removes a #${id} author`
  }
}
