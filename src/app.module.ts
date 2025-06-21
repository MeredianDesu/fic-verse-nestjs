import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Genre } from './modules/genre/entities/genre.entity'
import { GenreService } from './modules/genre/genre.service'
import { GenreController } from './modules/genre/genre.controller'
import * as dotenv from 'dotenv'

dotenv.config()

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DATABASE,
      entities: [Genre],
      synchronize: process.env.SYNCHRONIZE === 'true',
    }),
    TypeOrmModule.forFeature([Genre]),
  ],
  providers: [GenreService],
  controllers: [GenreController],
})
export class AppModule {}

// console.log('username: ' + process.env.DB_USERNAME)
// console.log('password: ' + process.env.DB_PASSWORD)
// console.log('database: ' + process.env.DATABASE)
