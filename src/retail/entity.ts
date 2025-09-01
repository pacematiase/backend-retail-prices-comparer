import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Retail {
  @PrimaryKey()
  retailId!: number;
  @Property({ nullable: false })
  retailName!: string;

  constructor(retailId: number, retailName: string) {
    this.retailId = retailId;
    this.retailName = retailName;
  }
}
