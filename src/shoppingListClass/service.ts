import { rShoppingListCreate, rShoppingListFindAll,rShoppingListFindOneById,rShoppingListRemove,rShoppingListUpdate } from "./repository.js";
import{ ControllerResponse } from "../shared/classes/controllerResponse.js";
import { ShoppingListClass } from "./entity.js";
import { User } from "../user/entity.js";
import { parse } from "path";

export async function sShoppingListFindAll(userId: string | undefined): Promise<ControllerResponse<ShoppingListClass[] | null>> {
    try {
        if (!userId){
            return new ControllerResponse(400, "userId is required", null, null);
        }
        const user = parseInt(userId);
        if (isNaN(user)){
            return new ControllerResponse(400, "userId must be a number", null, null);
        }
        const shoppingLists = await rShoppingListFindAll(user);
        if (shoppingLists && shoppingLists.length > 0){
            return new ControllerResponse(200, "Shopping lists found", "", shoppingLists);
        }
        return new ControllerResponse(404, "No shopping lists found for this user", null, []);       
    }catch(e){
        return new ControllerResponse(500, "Internal server error", JSON.stringify(e), null);
    }
    
}
export async function sShoppingListCreate(userId: string | undefined,shoppingList: ShoppingListClass): Promise<ControllerResponse<ShoppingListClass | null>> {
    
    try {
        if (!userId){
        return new ControllerResponse(400, "userId is required", null, null);
        } 
        const user = parseInt(userId);
        if (isNaN(user)){
            return new ControllerResponse(400, "userId must be a number", null, null);
        }
        const shoppingListCreated = await rShoppingListCreate(user, shoppingList);
        return new ControllerResponse(200, "Shopping list created", "", shoppingListCreated);
    }catch(e){
        return new ControllerResponse(500, "Internal server error", JSON.stringify(e), null);
        } 
    
}
export async function sShoppingListFindOneById(userId: string | undefined,id: number): Promise<ControllerResponse<ShoppingListClass | null>> {
    try {
        if (!userId){
            return new ControllerResponse(400, "userId is required", null, null);
        }
        const user = parseInt(userId);
        if (isNaN(user)){
            return new ControllerResponse(400, "userId must be a number", null, null);
        }
        const shoppingList = await rShoppingListFindOneById(user, id);
        if (shoppingList){
            return new ControllerResponse(200, "Shopping list found", "", shoppingList);
        }
        return new ControllerResponse(404, "Shopping list not found", null, null);       
    }catch(e){
        return new ControllerResponse(500, "Internal server error", JSON.stringify(e), null);
    }
    
}

export async function sShoppingListUpdate(userId: string | undefined,id: number, shoppingList: ShoppingListClass): Promise<ControllerResponse<ShoppingListClass | null>> {
    try {
        if (!userId){
            return new ControllerResponse(400, "userId is required", null, null);
        }
        const user = parseInt(userId);
        if (isNaN(user)){
            return new ControllerResponse(400, "userId must be a number", null, null);
        }
        const shoppingListUpdated = await rShoppingListUpdate(user,id, shoppingList);
        return new ControllerResponse(200, "Shopping list updated", "", shoppingListUpdated);
    }catch(e){
        return new ControllerResponse(500, "Internal server error", JSON.stringify(e), null);
        }
}

export async function sShoppingListRemove(userId: string | undefined, id: number): Promise<ControllerResponse<ShoppingListClass | null>> {
    try {
        if (!userId){
            return new ControllerResponse(400, "userId is required", null, null);
        }
        const user = parseInt(userId);
        if (isNaN(user)){
            return new ControllerResponse(400, "userId must be a number", null, null);
        }
        const shoppingList = await rShoppingListRemove(user, id);
        return new ControllerResponse(200, "Shopping list deleted", "", shoppingList);
    }catch(e){
        return new ControllerResponse(500, "Internal server error", JSON.stringify(e), null);
        }
}