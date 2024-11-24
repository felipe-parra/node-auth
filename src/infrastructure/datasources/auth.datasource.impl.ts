import {
  AuthDatasource,
  CustomError,
  RegisterUserDto,
  UserEntity,
} from '../../domain'

export class AuthDataSourceImpl implements AuthDatasource {
  async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    const { name, email, password } = registerUserDto

    try {
      // Check email
      // Hash pass
      // Map response
      // Store

      return new UserEntity('1', name, email, password, ['ADMIN_ROLE'])
    } catch (error) {
      if (error instanceof CustomError) {
        throw error
      }

      throw CustomError.internalServer()
    }
  }
}
