import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { AuthorModule } from '../author/author.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Author } from '../author/entities/author.entity'
import { JwtModule } from '@nestjs/jwt'

@Module({
  imports: [
    AuthorModule,
    TypeOrmModule.forFeature([Author]),
    JwtModule.register({ global: true, secret: process.env.JWT_SECRET, signOptions: { expiresIn: '5m' } }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
