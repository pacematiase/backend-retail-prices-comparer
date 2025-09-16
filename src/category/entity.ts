import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class Category {
  @PrimaryKey()
  categoryId!: number;
  @Property({ nullable: false, unique: true })
  categoryName!: string;
}
