import { JwtAdapter } from '../../../config/jwt'
import { AuthRepository, CustomError, RegisterUserDto } from '../..'

interface UserToken {
  token: string
  user: {
    id: string
    name: string
    email: string
  }
}

type SignToken = (payload: Object, duration?: string) => Promise<string | null>

interface RegisterUserUseCase {
  execute(registerUserDto: RegisterUserDto): Promise<UserToken>
}

export class RegisterUser implements RegisterUserUseCase {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly signToken: SignToken = JwtAdapter.generateToken
  ) {}

  async execute(registerUserDto: RegisterUserDto): Promise<UserToken> {
    // Crear usuario
    const user = await this.authRepository.register(registerUserDto)

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
