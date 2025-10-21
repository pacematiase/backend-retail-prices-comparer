import { Entity, OneToMany, PrimaryKey, Property, Collection } from '@mikro-orm/core';
import { UserRole } from '../shared/enums/userRole.js';
import { ShoppingListClass } from '../shoppingListClass/entity.js';
@Entity()
export class User {
  @PrimaryKey()
  id!: number;
  @Property({ nullable: false, unique: true })
  userName!: string;
  @Property({ nullable: false, hidden: true })
  userPassword!: string;
  @Property({ nullable: false })
  userRole!: UserRole;
  @OneToMany(() => ShoppingListClass, shoppingList => shoppingList.user)
  shoppingLists = new Collection<ShoppingListClass>(this);
  
  constructor(userName: string, userPassword: string, userRole: UserRole) {
    this.userName = userName;
    this.userPassword = userPassword;
    this.userRole = userRole;
    this.shoppingLists = new Collection<ShoppingListClass>(this);
  }
}
