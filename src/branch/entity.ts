import { Entity, PrimaryKey, ManyToOne, Property } from "@mikro-orm/core";

@Entity()
export class Branch {
  @PrimaryKey()
  branchId!: number;

  @PrimaryKey()
  retailId!: number;

  @Property({ nullable: false, unique: false })
  branchName!: string;

  @Property({ nullable: true, unique: false })
  branchPostalCode!: string;

  @Property({ nullable: true, unique: false })
  branchCity!: string;

  @Property({ nullable: true, unique: false })
  branchAddress!: string;

  @Property({ nullable: true, unique: false })
  branchProvinceCode!: string;

  constructor(
    branchId: number,
    retailId: number,
    branchName: string,
    branchPostalCode: string,
    branchCity: string,
    branchAddress: string,
    branchProvinceCode: string
  ) {
    this.branchId = branchId;
    this.retailId = retailId;
    this.branchName = branchName;
    this.branchPostalCode = branchPostalCode;
    this.branchCity = branchCity;
    this.branchAddress = branchAddress;
    this.branchProvinceCode = branchProvinceCode;
  }

  static generateDefaultBranchId(): number {
    // Generate a random number starting with 9000000
    const baseNumber = 9000000;
    const randomSuffix = Math.floor(Math.random() * 1000000); // 6 digits
    return baseNumber + randomSuffix;
  }
}
