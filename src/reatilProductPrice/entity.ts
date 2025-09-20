import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class RetailProductPrice {
  @PrimaryKey()
  retailId!: number;

  @PrimaryKey()
  productId!: number;

  @PrimaryKey()
  dateFrom!: Date;

  @Property({ type: "decimal", precision: 10, scale: 2 })
  price!: number;

  @Property({ type: "datetime", nullable: true })
  dateTo?: Date;

  constructor(
    retailId: number,
    productId: number,
    dateFrom: Date,
    price: number,
    dateTo?: Date
  ) {
    this.retailId = retailId;
    this.productId = productId;
    this.dateFrom = dateFrom;
    this.price = price;
    this.dateTo = dateTo;
  }
}
