import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import * as dotenv from 'dotenv'

import { AuthorModule } from './modules/author/author.module'
import { GenreModule } from './modules/genre/genre.module'
import { FanficModule } from './modules/fanfic/fanfic.module'
import { AuthService } from './modules/auth/auth.service'
import { AuthModule } from './modules/auth/auth.module'

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
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: process.env.SYNCHRONIZE === 'true',
    }),
    AuthorModule,
    GenreModule,
    FanficModule,
    AuthModule,
  ],
})
export class AppModule {}

// console.log('username: ' + process.env.DB_USERNAME)
// console.log('password: ' + process.env.DB_PASSWORD)
// console.log('database: ' + process.env.DATABASE)
