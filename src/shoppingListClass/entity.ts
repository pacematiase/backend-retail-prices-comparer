import { Entity, ManyToOne, PrimaryKey, Rel } from "@mikro-orm/core";
import { User } from "../user/entity.js";
@Entity()
export class ShoppingListClass {
  @PrimaryKey()
  id!: number;

  @ManyToOne(() => User)
  user!: Rel<User>;

/*@OneToMany(() => ShoppingListItem, item => item.shoppingListClass)
  items = new Collection<ShoppingListItem>(this); */                        //Cuando cree el ShoppingListItem
}