import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthServiceInterface } from './interfaces/auth.service.interface'
import { InjectRepository } from '@nestjs/typeorm'
import { Author } from '../author/entities/author.entity'
import { Repository } from 'typeorm'
import { SignUpDto } from './dto/sign-up.dto'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService implements AuthServiceInterface {
  constructor(
    @InjectRepository(Author) private authorRepository: Repository<Author>,
    private jwtService: JwtService,
  ) {}

  async signUp(data: SignUpDto): Promise<Object> {
    const existingUser = await this.authorRepository.findOne({ where: { email: data.email } })

    if (existingUser != undefined || null) {
      throw new ConflictException('User already exists.')
    }

    if (data.password != data.samePassword) {
      throw new UnauthorizedException("Passwords does't match.")
    }

    const newUser = this.authorRepository.create({
      email: data.email,
      password: data.password, // TODO сделать хэширование с солью
    })

    await this.authorRepository.save(newUser)

    const payload = { sub: newUser.id, name: newUser.email }

    return {
      access_token: await this.jwtService.signAsync(payload, { secret: process.env.JWT_SECRET }),
    }
  }
}
