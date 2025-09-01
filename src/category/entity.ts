import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Category {
  @PrimaryKey()
  categoryId!: number;
  @Property({ nullable: false })
  categoryName!: string;

  constructor(categoryId: number, categoryName: string) {
    this.categoryId = categoryId;
    this.categoryName = categoryName;
  }
}
