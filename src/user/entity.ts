import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

export enum UserRole {
  administrator = 1,
  endUser = 2,
}

export function isUserRole(value: unknown): value is UserRole {
  return typeof value === 'number' && Object.values(UserRole).includes(value);
}

@Entity()
export class User {
  @PrimaryKey()
  userId!: number;
  @Property({ nullable: false, unique: true })
  userName!: string;
  @Property({ nullable: false })
  userPassword!: string;
  @Property({ nullable: false })
  userRole!: UserRole;

  constructor(userName: string, userPassword: string, userRole: UserRole) {
    this.userName = userName;
    this.userPassword = userPassword;
    this.userRole = userRole;
  }
}
