import { Validators } from '../../../config'

export class LoginUserDto {
  private constructor(public email: string, public password: string) {}

  static sign(object: { [key: string]: any }): [string?, LoginUserDto?] {
    const { email, password } = object
    console.log({ object })
    if (!email) return ['Missing email']
    if (!Validators.email.test(email)) return ['Email is not valid']

    if (!password) return ['Missing passowrd']

    return [undefined, new LoginUserDto(email, password)]
  }
}
