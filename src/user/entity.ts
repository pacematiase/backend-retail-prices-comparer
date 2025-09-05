import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { UserRole } from '../shared/enums/userRole.js';

@Entity()
export class User {
  @PrimaryKey()
  userId!: number;
  @Property({ nullable: false, unique: true })
  userName!: string;
  @Property({ nullable: false, hidden: true })
  userPassword!: string;
  @Property({ nullable: false })
  userRole!: UserRole;

  constructor(userName: string, userPassword: string, userRole: UserRole) {
    this.userName = userName;
    this.userPassword = userPassword;
    this.userRole = userRole;
  }
}
