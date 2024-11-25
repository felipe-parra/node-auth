import { JwtAdapter } from '../../../config/jwt'
import { LoginUserDto } from '../../dtos/auth/login-user.dto'
import { CustomError } from '../../errors/custom.error'
import { AuthRepository } from '../../repositories/auth.repository'

interface UserToken {
  token: string
  user: {
    id: string
    name: string
    email: string
  }
}

interface LoginUserUseCase {
  execute(loginUser: LoginUserDto): Promise<UserToken>
}

type SignToken = (payload: Object, duration?: string) => Promise<string | null>

export class LoginUser implements LoginUserUseCase {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly signToken: SignToken = JwtAdapter.generateToken
  ) {}
  async execute(loginUser: LoginUserDto): Promise<UserToken> {
    // Validate user
    const user = await this.authRepository.login(loginUser)

    // Token
    const token = await this.signToken(user.id)
    if (!token) throw CustomError.internalServer()

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.emaill,
      },
    }
  }
}
