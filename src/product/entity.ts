import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { SubCategory } from "../subCategory/entity.js";

@Entity()
export class Product {
  @PrimaryKey()
  productId!: number;
  @ManyToOne()
  subCategory!: SubCategory;
  @Property({ nullable: false, unique: true })
  productSKU!: string;
  @Property({ nullable: false })
  productName!: string;
  @Property({ nullable: true })
  productCodeBar!: string;
  @Property({ nullable: true })
  productImage!: string;
  constructor(
    subCategory: SubCategory,
    productSKU: string,
    productName: string,
    productCodeBar: string,
    productImage: string
  ) {
    this.subCategory = subCategory;
    this.productSKU = productSKU;
    this.productName = productName;
    this.productCodeBar = productCodeBar;
    this.productImage = productImage;
  }
}
