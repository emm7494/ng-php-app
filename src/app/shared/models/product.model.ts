// export interface Product {
//   id: number;
//   name: string;
//   price: number;
//   image: string;
//   description: string;
// }
export class Product {
  constructor(
    public id: number = null,
    public name: string = null,
    public price: number = null,
    public image: string = null,
    public description: string = null
  ) {}
}
