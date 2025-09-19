import { Entity, PrimaryKey } from "@mikro-orm/core";

@Entity()
export class RetailProduct {
  @PrimaryKey()
  retailId!: number;

  @PrimaryKey()
  productId!: number;

  constructor(retailId: number, productId: number) {
    this.retailId = retailId;
    this.productId = productId;
  }
}
