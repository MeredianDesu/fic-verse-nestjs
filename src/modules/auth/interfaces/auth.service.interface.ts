import { SignInDto } from '../dto/sign-in.dto'
import { SignUpDto } from '../dto/sign-up.dto'

export interface AuthServiceInterface {
  signUp(data: SignUpDto): Promise<Object>
  signIn(data: SignInDto): Promise<Object | null>
}
