export class CurrentUser implements User {
  static tokenNotExpired(user: CurrentUser) {
    const { jwtNBF, jwtEXP } = user;
    if (
      !(jwtNBF || jwtEXP) ||
      new Date().getTime() > +jwtEXP * 1000 ||
      new Date().getTime() < +jwtNBF * 1000
    ) {
      return false;
    }
    return true;
  }

  constructor(
    public id: string,
    public email: string,
    public firstname: string,
    public lastname: string,
    public created: string,
    public modified: string,
    public jwt: string,
    public jwtNBF: string,
    public jwtEXP: string
  ) {}

  get token() {
    if (
      !(this.jwtEXP || this.jwtNBF) ||
      new Date().getTime() > +this.jwtEXP * 1000 ||
      new Date().getTime() < +this.jwtNBF * 1000
    ) {
      return null;
    }
    return this.jwt;
  }

  get jwtExpirationDate(): Date {
    return new Date(+this.jwtEXP * 1000);
  }
  get jwtNotBeforeDate(): Date {
    return new Date(+this.jwtNBF * 1000);
  }
}
export interface User {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  created: string;
  modified: string;
}
