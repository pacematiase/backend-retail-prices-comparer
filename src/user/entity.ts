import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class User {
  @PrimaryKey()
  userId!: number;
  @Property({ nullable: false })
  userName!: string;
  @Property({ nullable: false })
  userPassword!: string;
  @Property({ nullable: false })
  userRole!: string;
}
