export class UserEntity {
  constructor(
    public id: string,
    public name: string,
    public lastName: string,
    public emaill: string,
    public roles: string[],
    public birthday?: string,
    public imgUrl?: string
  ) {}
}
