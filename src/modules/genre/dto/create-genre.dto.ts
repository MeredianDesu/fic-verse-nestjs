import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

export class CreateGenreDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string

  @IsString({ each: true })
  @IsOptional()
  readonly coverUrls: string[]

  @IsNumber()
  @IsOptional()
  readonly count: number
}
