import { Request, Response } from 'express'
import {
  AuthRepository,
  CustomError,
  LoginUser,
  LoginUserDto,
  RegisterUser,
  RegisterUserDto,
} from '../../domain'
import { UserModel } from '../../data/mongodb'

export class AuthController {
  // Dependency injection
  constructor(private readonly authRepository: AuthRepository) {}
  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message })
    }

    console.error(error)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
  registerUser = (req: Request, res: Response) => {
    const [error, registerUserDto] = RegisterUserDto.create(req.body)

    if (error) {
      res.status(400).json({ error })
    }

    new RegisterUser(this.authRepository)
      .execute(registerUserDto!)
      .then((data) => res.json(data))
      .catch((error) => this.handleError(error, res))
  }

  loginUser = (req: Request, res: Response) => {
    console.log({
      email: req.body.email,
      password: req.body.password,
    })
    const [error, loginUserDto] = LoginUserDto.sign(req.body)

    if (error) {
      res.status(400).json({ error })
      return
    }

    new LoginUser(this.authRepository)
      .execute(loginUserDto!)
      .then((data) => res.json(data))
      .catch(() => res.status(500).json({ error: 'Internal Server Error' }))
  }

  getUsers = (req: Request, res: Response) => {
    UserModel.find()
      .then((users) => res.json({ user: req.body.user }))
      .catch(() => res.status(500).json({ error: 'Internal Server Error' }))
  }
}
