import { ApiProperty } from '@nestjs/swagger'

export class DisplayAuthorDto {
  @ApiProperty()
  id: number

  @ApiProperty()
  name: string

  @ApiProperty()
  email: string

  @ApiProperty()
  avatar: string

  @ApiProperty()
  coverUrl: string

  @ApiProperty()
  about: string

  @ApiProperty()
  tariffPlan: string

  @ApiProperty()
  role: string

  @ApiProperty()
  createdAt: Date
}
