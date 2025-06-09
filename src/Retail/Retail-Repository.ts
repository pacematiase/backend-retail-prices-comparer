import { Repository } from "../Shared/repository";
import { Retail } from "./Retail-Entity";

// BDD en memoria
const retailData: Retail[] = [
  {
    retailId: 1,
    retailName: "coto",
  },
  {
    retailId: 2,
    retailName: "La Gallega",
  },
];

// logica del CRUD y validaciones
export default class RetailRepository implements Repository<Retail> {
  public add(item: Retail): Retail | undefined {
    retailData.push(item);
    return item;
  }
  public update(item: Retail): Retail | undefined {
    const index: number = retailData.findIndex(
      (retail) => retail.retailId === item.retailId
    );
    if (index !== -1) {
      retailData[index] = item;
    }
    return retailData[index];
  }
  public delete(item: { id: number }): Retail | undefined {
    const index: number = retailData.findIndex(
      (retail) => retail.retailId === item.id
    );
    let retailDeleted: Retail | undefined;
    if (index !== -1) {
      retailDeleted = retailData[index];
      retailData.splice(index, 1);
    }
    return retailDeleted;
  }
  public findAll() {
    return retailData;
  }

  public findOne(item: { id: number | string }): Retail | undefined {
    return retailData.find((retail) => retail.retailId == item.id);
  }
}
