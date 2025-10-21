import { assign } from "@mikro-orm/core";
import {orm} from "../shared/db/orm.js";
import {Brand} from "./entity.js";

export function rBrandFindAll() {
    return orm.em.find(Brand, {});
}

export async function rBrandFindById(id: number) {
  return await orm.em.findOne(Brand, {id: id});
}

export async function rBrandFindByName(name: string) {
    return await orm.em.findOne(Brand, {brandName: name});
}

export async function rBrandCreate(brand: Brand) {
    const newBrand = orm.em.create(Brand, brand);
    await orm.em.persistAndFlush(newBrand);
    return newBrand
}

export async function rBrandUpdate(id: number, brand:Partial<Brand>){
    const brandToUpdate = orm.em.getReference(Brand, id);
    orm.em.assign(brandToUpdate, brand);
    await orm.em.flush();
    return brandToUpdate
}

export async function rBrandRemove(id: number){
        const brandToRemove = orm.em.getReference(Brand, id);
        await orm.em.removeAndFlush(brandToRemove);
        return brandToRemove    
}