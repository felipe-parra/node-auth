import { Request, Response } from 'express'
import { AuthRepository, CustomError, RegisterUserDto } from '../../domain'
import { JwtAdapter } from '../../config/jwt'
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

    this.authRepository
      .register(registerUserDto!)
      .then(async (user) =>
        res.json({
          user,
          token: await JwtAdapter.generateToken({ email: user.emaill }),
        })
      )
      .catch((error) => this.handleError(error, res))
  }

  loginUser = (req: Request, res: Response) => {
    res.json({
      message: 'loginUser controller',
    })
  }

  getUsers = (req: Request, res: Response) => {
    UserModel.find()
      .then((users) => res.json({ user: req.body.user }))
      .catch(() => res.status(500).json({ error: 'Internal Server Error' }))
  }
}
