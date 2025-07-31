import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common'
import { AuthorService } from './author.service'
import { CreateAuthorDto } from './dto/create-author.dto'
import { UpdateAuthorDto } from './dto/update-author.dto'
import { ApiExtraModels, ApiOkResponse, ApiResponse, ApiSchema, getSchemaPath } from '@nestjs/swagger'
import { DisplayAuthorDto } from './dto/display-author.dto'

@Controller('author')
@ApiSchema({ description: 'User' })
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Post()
  @ApiResponse({
    description: 'Create a user.',
    status: HttpStatus.CREATED,
  })
  create(@Body() createAuthorDto: CreateAuthorDto) {
    return this.authorService.create(createAuthorDto)
  }

  @Get()
  @ApiExtraModels(DisplayAuthorDto)
  @ApiOkResponse({
    description: 'List of authors',
    schema: {
      type: 'array',
      items: { $ref: getSchemaPath(DisplayAuthorDto) },
    },
  })
  findAll() {
    return this.authorService.findAll()
  }

  @Get(':id')
  @ApiExtraModels(DisplayAuthorDto)
  @ApiOkResponse({
    description: 'Get user by ID.',
    schema: {
      allOf: [{ $ref: getSchemaPath(DisplayAuthorDto) }],
    },
  })
  findOne(@Param('id') id: string) {
    return this.authorService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthorDto: UpdateAuthorDto) {
    return this.authorService.update(+id, updateAuthorDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authorService.remove(+id)
  }
}
