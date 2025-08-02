import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { AuthServiceInterface } from './interfaces/auth.service.interface'
import { InjectRepository } from '@nestjs/typeorm'
import { Author } from '../author/entities/author.entity'
import { Repository } from 'typeorm'
import { SignUpDto } from './dto/sign-up.dto'
import { JwtService } from '@nestjs/jwt'
import { SignInDto } from './dto/sign-in.dto'
import { AuthMessages } from 'src/constants/auth.messages'
import { compareHashPassword, generateHashPassword } from 'src/helpers/hash-password'

@Injectable()
export class AuthService implements AuthServiceInterface {
  constructor(
    @InjectRepository(Author) private authorRepository: Repository<Author>,
    private jwtService: JwtService,
  ) {}

  async signUp(data: SignUpDto): Promise<Object> {
    const existingUser = await this.authorRepository.findOne({ where: { email: data.email } })

    if (existingUser != undefined || null) {
      throw new ConflictException(AuthMessages.USER_NOT_FOUND)
    }

    if (data.password != data.samePassword) {
      throw new UnauthorizedException(AuthMessages.PASSWORD_NOT_MATCH)
    }

    const newUser = this.authorRepository.create({
      email: data.email,
      password: generateHashPassword(data.password),
    })

    await this.authorRepository.save(newUser)

    const payload = { sub: newUser.id, name: newUser.email }

    return {
      access_token: await this.jwtService.signAsync(payload, { secret: process.env.JWT_SECRET }),
    }
  }

  async signIn(data: SignInDto): Promise<Object | null> {
    const user = await this.authorRepository.findOne({ where: { email: data.email } })

    if (!user) {
      throw new NotFoundException(AuthMessages.USER_NOT_FOUND)
    }

    const isPasswordValid = compareHashPassword(data.password, user.password)
    if (!isPasswordValid) {
      throw new UnauthorizedException(AuthMessages.INVALID_CREDENTIALS)
    }

    const payload = { sub: user.id, name: user.name }

    const token = await this.jwtService.signAsync(payload, { secret: process.env.JWT_SECRET })

    return { access_token: token }
  }
}
