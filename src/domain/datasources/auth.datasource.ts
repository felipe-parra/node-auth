import { RegisterUserDto } from '../dtos/auth/register-user.dto'
import { UserEntity } from '../entities/user.entity'

export abstract class AuthDatasource {
  // TODO: login
  // abstract login(loginUserDto: LoginUserDto): Promise<LoginUserEntity>

  abstract register(registerUserDto: RegisterUserDto): Promise<UserEntity>
}
