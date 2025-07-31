import { SignUpDto } from '../dto/sign-up.dto'

export interface AuthServiceInterface {
  signUp(data: SignUpDto): Promise<Object>
}
