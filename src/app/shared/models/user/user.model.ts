export class CurrentUser implements User {
  static tokenNotExpired({ jwtNBF, jwtEXP }) {
    if (
      !(jwtNBF || jwtEXP) ||
      Date.now() > +jwtEXP * 1000 ||
      Date.now() < +jwtNBF * 1000
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
    private jwtNBF: string,
    private jwtEXP: string
  ) {}

  get token() {
    if (
      !(this.jwtEXP || this.jwtNBF) ||
      Date.now() > +this.jwtEXP * 1000 ||
      Date.now() < +this.jwtNBF * 1000
    ) {
      return null;
    }
    return this.jwt;
  }
  // new Date(new Date().getTime() + +resData.data.payload.exp * 1000)
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
