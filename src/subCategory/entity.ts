import { Entity, PrimaryKey, Property, ManyToOne } from "@mikro-orm/core";
import { Category } from "../category/entity.js";

@Entity()
export class SubCategory {
  @PrimaryKey()
  subCategoryId!: number;
  @ManyToOne(() => Category, { nullable: false })
  categoryId!: Category;
  @Property({ nullable: false, unique: true })
  subCategoryName!: string;
}
