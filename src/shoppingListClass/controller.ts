import { Request, Response } from "express";
import { sShoppingListFindAll, sShoppingListCreate, sShoppingListUpdate, sShoppingListRemove, sShoppingListFindOneById } from "./service.js";
import { ShoppingListClass } from "./entity.js";
import { parse } from "path";


export async function cShoppingListFindAll(req: Request, res: Response) {
    const user = req.userId
    const shoppingLists = await sShoppingListFindAll(user);
    res.status(shoppingLists.statusCode).json({
            message: shoppingLists.message,
            errDetails: shoppingLists.errDetails,
            data: shoppingLists.data
        })
}

export async function cShoppingListCreate(req: Request, res: Response){
    const user = req.userId
    const shoppingList = await sShoppingListCreate(user, req.body);
    res.status(shoppingList.statusCode).json({
        message: shoppingList.message,
        errDetails: shoppingList.errDetails,
        data: shoppingList.data
    })
}

export async function cShoppingListFindOneById(req: Request, res: Response) {
    const user = req.userId
    const id = parseInt(req.params.id);
    const shoppingList = await sShoppingListFindOneById(user,id);
    res.status(shoppingList.statusCode).json({
        message: shoppingList.message,
        errDetails: shoppingList.errDetails,
        data: shoppingList.data
    })
}
export async function cShoppingListUpdate(req: Request, res: Response) {
    const user = req.userId
    const  id  = parseInt(req.params.id);

    const updatedShoppingList = await sShoppingListUpdate( user,id, req.body);
    res.status(updatedShoppingList.statusCode).json({
        message: updatedShoppingList.message,
        errDetails: updatedShoppingList.errDetails,
        data: updatedShoppingList.data
    })
}

export async function cShoppingListDelete(req: Request, res: Response) {
    const user = req.userId
    const id = parseInt(req.params.id);
    const shoppingLisrRemoved = await sShoppingListRemove(user,id);
    res.status(shoppingLisrRemoved.statusCode).json({
        message: shoppingLisrRemoved.message,
        errDetails: shoppingLisrRemoved.errDetails,
        data: shoppingLisrRemoved.data
    })
}
