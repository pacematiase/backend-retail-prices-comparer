import { ShoppingListClass } from "./entity.js";
import { orm } from "../shared/db/orm.js";
import { User } from "../user/entity.js";

export async function rShoppingListFindAll(userId: number) {
    const userRef = orm.em.getReference(User, userId);
        return await orm.em.find(ShoppingListClass, { user: userRef });
}
export async function rShoppingListCreate(userId: number, shoppingList: ShoppingListClass) {
    const user = orm.em.getReference(User, userId);
    const shoppingListCreated = orm.em.create(ShoppingListClass, shoppingList);
    shoppingListCreated.user = user;

    await orm.em.persistAndFlush(shoppingListCreated);
    return shoppingListCreated;
}

export async function rShoppingListFindOneById(userId: number, id: number) {
    const userRef = orm.em.getReference(User, userId);
    return await orm.em.findOne(ShoppingListClass, { id: id , user: userRef });
}   



export async function rShoppingListUpdate(userId: number,id: number, shoppingList: Partial<ShoppingListClass>) {
    const oldShoppingList = await rShoppingListFindOneById(userId, id);
    if (!oldShoppingList) {
        throw new Error('No tenés permiso para modificar esta lista o no existe');
    }
    orm.em.assign(oldShoppingList, shoppingList)
    await orm.em.flush()
    return oldShoppingList
}


export async function rShoppingListRemove(userId: number, id: number) {
    const validShoppingList = await rShoppingListFindOneById(userId, id);
    if (!validShoppingList) {
        throw new Error('No tenés permiso para eliminar esta lista o no existe');       
    }
    const shoppingListToRemove = orm.em.removeAndFlush(validShoppingList)
    return validShoppingList;
}