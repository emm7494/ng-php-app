export class CurrentUser implements User {
  constructor(
    public id: string,
    public email: string,
    public firstname: string,
    public lastname: string,
    public created: string,
    public modified: string,
    public jwt: string,
    public jwtExpirationDate: Date
  ) {}

  // get token() {
  //   if (!this.jwtExpirationDate || new Date() > this.jwtExpirationDate) {
  //     return null;
  //   }
  //   return this.jwt;
  // }
}
export interface User {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  created: string;
  modified: string;
}
