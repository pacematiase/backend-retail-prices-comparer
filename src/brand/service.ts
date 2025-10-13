import { Brand } from "./entity.js";
import { rBrandFindAll, rBrandFindById, rBrandFindByName, rBrandCreate, rBrandUpdate, rBrandRemove} from "./repository.js"
import { ControllerResponse } from "../shared/classes/controllerResponse.js";


export async function  sBrandFindAll(): Promise<ControllerResponse<Brand[] | null>>{
    try {
        const brandList = await rBrandFindAll();
        if (brandList && brandList.length > 0) {
            return new ControllerResponse(200, "Brands found", "", brandList);
        }
        return new ControllerResponse(404, "No brands found", null, []);
    }catch(e){
        return new ControllerResponse<Brand[]>(500, "Internal server error", JSON.stringify(e), []);
    }
    
}

export async function sBrandFindById(id: number): Promise<ControllerResponse<Brand | null>>{
    try {
        const obrand = await rBrandFindById(id);
        if (obrand) {
            return new ControllerResponse(200, "Brand found", "", obrand);
        }
        return new ControllerResponse(404, "Brand not found", "", null);
    }catch(e){
        return new ControllerResponse(500, "Internal server error", JSON.stringify(e), null);
    }
}
export async function sBrandFindByName(name: string): Promise<ControllerResponse<Brand | null>>{
    try {
        const obrand = await rBrandFindByName(name);
        if (obrand) {
            return new ControllerResponse(200, "Brand found", "", obrand);
        }
        return new ControllerResponse(404, "Brand not found","", null);
    }catch(e){
        return new ControllerResponse(500, "Internal server error", JSON.stringify(e), null);
    }
}

export async function sBrandCreate(brand:Brand): Promise<ControllerResponse<Brand | null>>{
    try {
        const obrand = await rBrandCreate(brand);
            return new ControllerResponse(200, "Brand created", "", obrand);
    }catch(e){
        console.log(e);
        return new ControllerResponse(500, "Internal server error", JSON.stringify(e), null);
    }
    
}

export async function sBrandUpdate(id : number, brand:Brand): Promise<ControllerResponse<Brand | null>>{
    try {
        const obrand = await rBrandUpdate(id, brand);
        return new ControllerResponse(200, "Brand updated", "", obrand);
    }catch(e:any){
        return new ControllerResponse(500, "Internal server error", JSON.stringify(e), null);
    }
}
export async function sBrandRemove(id:number) {
    try {
        const obrand = await rBrandRemove(id);
        return new ControllerResponse(200, "Brand deleted", "", obrand);
    }catch(e:any){
        return new ControllerResponse(500, "Internal server error", JSON.stringify(e), null);
        }
}