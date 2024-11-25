import { BcryptAdapter } from '../../config'
import { UserModel } from '../../data/mongodb'
import {
  AuthDatasource,
  CustomError,
  LoginUserDto,
  RegisterUserDto,
  UserEntity,
} from '../../domain'
import { UserMapper } from '../'

type HashFunction = (password: string) => string
type CompareFunction = (password: string, hashed: string) => boolean

export class AuthDataSourceImpl implements AuthDatasource {
  constructor(
    private readonly hashPassword: HashFunction = BcryptAdapter.hash,
    private readonly comparePassword: CompareFunction = BcryptAdapter.compare
  ) {}

  async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
    const { email, password } = loginUserDto

    // Check mail
    const user = await UserModel.findOne({ email })

    if (!user) throw CustomError.badRequest("Email or Password don't match")

    const isMatchPassword = this.comparePassword(password, user.password)

    if (!isMatchPassword) {
      throw CustomError.badRequest("Email or Password don't match")
    }
    return UserMapper.userEntityFromObject(user)
  }

  async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    const { name, email, password } = registerUserDto

    try {
      // Check email
      const exists = await UserModel.findOne({ email: email })
      if (exists) throw CustomError.badRequest('User already exists')

      // Hash pass
      const hashedPassword = this.hashPassword(password)

      const user = await UserModel.create({
        name,
        email: email,
        password: hashedPassword,
      })

      // Save user
      await user.save()
      // Map response
      return UserMapper.userEntityFromObject(user)
    } catch (error) {
      if (error instanceof CustomError) {
        throw error
      }

      throw CustomError.internalServer()
    }
  }
}
