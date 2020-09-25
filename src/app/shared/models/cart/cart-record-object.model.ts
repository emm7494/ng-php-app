export class CartRecordObject {
  productId: string;
  quantity: string;
  created: string;
  modified: string;
  constructor(options: {
    productId: string;
    quantity: string;
    created: string;
    modified: string;
  }) {
    this.productId = options.productId;
    this.quantity = options.quantity;
    this.created = options.created;
    this.modified = options.modified;
  }
}
