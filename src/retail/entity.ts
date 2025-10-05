import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Retail {
  @PrimaryKey()
  retailId!: number;
  @Property({ nullable: false, unique: true })
  retailName!: string;
  @Property({ nullable: true })
  retailUrl!: string;

  constructor(retailName: string, retailUrl?: string) {
    this.retailName = retailName;
    if (retailUrl) this.retailUrl = retailUrl;
  }
}
