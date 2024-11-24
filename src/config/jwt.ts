import jwt from 'jsonwebtoken'
import { envs } from './envs'

const SECRET = envs.JWT_SECRET

export class JwtAdapter {
  static async generateToken(
    payload: Object,
    duration: string = '2h'
  ): Promise<string | null> {
    return new Promise((resolve) => {
      jwt.sign(payload, SECRET, { expiresIn: duration }, (err, token) => {
        if (err) return resolve(null)

        resolve(token!)
      })
    })
  }

  static validateToken<T>(token: string): Promise<T | null> {
    return new Promise((resolve) => {
      jwt.verify(token, SECRET, (err, decoded) => {
        if (err) return resolve(null)

        resolve(decoded as T)
      })
    })
  }
}
