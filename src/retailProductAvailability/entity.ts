import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class RetailProductAvailability {
  @PrimaryKey()
  retailId!: number;

  @PrimaryKey()
  productId!: number;

  @PrimaryKey()
  dateFrom!: Date;

  @Property({ type: "datetime", nullable: true })
  dateTo?: Date;

  constructor(
    retailId: number,
    productId: number,
    dateFrom: Date,
    dateTo?: Date
  ) {
    this.retailId = retailId;
    this.productId = productId;
    this.dateFrom = dateFrom;
    this.dateTo = dateTo;
  }
}
