import { Controller, Get, Post, Body, HttpCode, HttpStatus, Logger } from '@nestjs/common'
import { AuthService } from './auth.service'
import { SignUpDto } from './dto/sign-up.dto'
import { SignInDto } from './dto/sign-in.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('register')
  signUp(@Body() signUpData: SignUpDto): Record<string, any> {
    return this.authService.signUp(signUpData)
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInData: SignInDto): Record<string, any> {
    return this.authService.signIn(signInData)
  }
}
