import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Retail {
  @PrimaryKey()
  retailId!: number;
  @Property({ nullable: false, unique: true })
  retailName!: string;
  constructor(retailName: string) {
    this.retailName = retailName;
  }
}
