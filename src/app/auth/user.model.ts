export class User {
  constructor(
    public email: string,
    public userId: string,
    private _token: string,
    private tokenExpiredDate: Date
  ) {}

  get token() {
    if (!this.tokenExpiredDate || new Date() > this.tokenExpiredDate)
      return null;
    return this._token;
  }
}
