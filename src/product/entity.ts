import { Entity, ManyToMany, ManyToOne, PrimaryKey, Property, Collection } from "@mikro-orm/core";
import { SubCategory } from "../subCategory/entity.js";
import { Brand } from "../brand/entity.js";

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
  @ManyToMany(() => Brand)
  brands = new Collection<Brand>(this);
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
