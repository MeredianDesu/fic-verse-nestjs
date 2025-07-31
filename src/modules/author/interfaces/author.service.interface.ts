import { CreateAuthorDto } from '../dto/create-author.dto'
import { Author } from '../entities/author.entity'

export interface AuthorServiceInterface {
  create(createAuthorDto: CreateAuthorDto): Promise<String>
}
