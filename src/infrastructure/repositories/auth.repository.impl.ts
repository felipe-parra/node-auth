import {
  AuthDatasource,
  AuthRepository,
  LoginUserDto,
  RegisterUserDto,
  UserEntity,
} from '../../domain'

export class AuthRepositoryImpl implements AuthRepository {
  constructor(private readonly datasource: AuthDatasource) {}

  async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
    return this.datasource.login(loginUserDto)
  }
  async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    return this.datasource.register(registerUserDto)
  }
}
