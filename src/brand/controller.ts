import { Request, Response, NextFunction } from "express";
import { sBrandCreate, sBrandFindAll, sBrandFindById, sBrandFindByName, sBrandRemove, sBrandUpdate } from "./service.js";
import { Brand } from "./entity.js";

export async function cBrandFindAll(req: Request, res: Response) {
    const obrands = await sBrandFindAll();
    res.status(obrands.statusCode).json({
        message: obrands.message,
        errDetails: obrands.errDetails,
        data: obrands.data
    })
    
}

export async function cBrandFindById(req: Request, res: Response) {
    const id = parseInt(req.params.id)
    const obrand = await sBrandFindById(id)
    res.status(obrand.statusCode).json({
        message: obrand.message,
        errDetails: obrand.errDetails,
        data: obrand.data
    })
}

export async function cBrandFindByName(req: Request, res: Response) {
    const name = req.params.name
    const obrand = await sBrandFindByName(name)
    res.status(obrand.statusCode).json({
        message: obrand.message,
        errDetails: obrand.errDetails,
        data: obrand.data
    })
}

export async function cBrandCreate(req: Request, res: Response){
    const brand = new Brand()
    brand.brandName = req.body.brandName
    const obrand = await sBrandCreate(brand)
    res.status(obrand.statusCode).json({
        message: obrand.message,
        errDetails: obrand.errDetails,
        data: obrand.data
    })
}

export async function cBrandUpdate(req: Request, res: Response){
    const brandId = parseInt(req.params.id)
    const oBrand = await sBrandUpdate(brandId, req.body )
    res.status(oBrand.statusCode).json({
        message: oBrand.message,
        errDetails: oBrand.errDetails,
        data: oBrand.data
    })
    }

export async function cBrandRemove(req: Request, res: Response){
    const brandId = parseInt(req.params.id)
    const oBrand = await sBrandRemove(brandId)
    res.status(oBrand.statusCode).json({
        message: oBrand.message,
        errDetails: oBrand.errDetails,
        data: oBrand.data
    })
    }