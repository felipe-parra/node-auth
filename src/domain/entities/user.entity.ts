export class UserEntity {
  constructor(
    public id: string,
    public name: string,
    public lastName: string,
    public emaill: string,
    public role: string[],
    public birthday?: string,
    public imgUrl?: string
  ) {}
}
