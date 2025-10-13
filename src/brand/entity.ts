import { Entity, PrimaryKey, Collection, Property, ManyToMany } from "@mikro-orm/core";
import { Product } from "../product/entity.js";

@Entity ()
export class Brand {
    @PrimaryKey({unique:true , nullable:false, type:"number", autoincrement: true})
    id!:  number;

    @Property({unique: true , nullable:false})
    brandName!: string ;

    @ManyToMany(() => Product, product => product.brands, { mappedBy: "brands" })
    products? = new Collection<Product>(this);
}