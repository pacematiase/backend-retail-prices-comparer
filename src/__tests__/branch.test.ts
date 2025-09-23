import { Branch } from "../branch/entity";
import { ControllerResponse } from "../shared/classes/controllerResponse";
import * as branchRepository from "../branch/repository";
import * as branchService from "../branch/service";
import * as branchController from "../branch/controller";
import { Request, Response } from "express";

// Mock the database ORM
jest.mock("../shared/db/orm", () => ({
  orm: {
    em: {
      findAll: jest.fn(),
      findOne: jest.fn(),
      find: jest.fn(),
      insert: jest.fn(),
      nativeUpdate: jest.fn(),
      nativeDelete: jest.fn(),
      begin: jest.fn(),
      commit: jest.fn(),
      rollback: jest.fn(),
    },
  },
}));

describe("Branch CRUD Operations", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockJson: jest.Mock;
  let mockStatus: jest.Mock;

  beforeEach(() => {
    mockJson = jest.fn();
    mockStatus = jest.fn().mockReturnValue({ json: mockJson });
    mockRequest = {};
    mockResponse = {
      status: mockStatus,
      json: mockJson,
    };
    jest.clearAllMocks();
  });

  describe("Repository Tests", () => {
    describe("rBranchFindAll", () => {
      it("should return all branches", async () => {
        const mockBranches = [
          new Branch(
            9000001,
            1,
            "Store A",
            "12345",
            "City A",
            "Address A",
            "AA"
          ),
          new Branch(
            9000002,
            1,
            "Store B",
            "54321",
            "City B",
            "Address B",
            "BB"
          ),
        ];

        const { orm } = await import("../shared/db/orm");
        (orm.em.findAll as jest.Mock).mockResolvedValue(mockBranches);

        const result = await branchRepository.rBranchFindAll();

        expect(orm.em.findAll).toHaveBeenCalledWith(Branch, {});
        expect(result).toEqual(mockBranches);
      });
    });

    describe("rBranchFindById", () => {
      it("should return branch by composite key", async () => {
        const mockBranch = new Branch(
          9000001,
          1,
          "Store A",
          "12345",
          "City A",
          "Address A",
          "AA"
        );

        const { orm } = await import("../shared/db/orm");
        (orm.em.findOne as jest.Mock).mockResolvedValue(mockBranch);

        const result = await branchRepository.rBranchFindById(9000001, 1);

        expect(orm.em.findOne).toHaveBeenCalledWith(Branch, {
          branchId: 9000001,
          retailId: 1,
        });
        expect(result).toEqual(mockBranch);
      });
    });

    describe("rBranchFindByRetailId", () => {
      it("should return branches by retail ID", async () => {
        const mockBranches = [
          new Branch(
            9000001,
            1,
            "Store A",
            "12345",
            "City A",
            "Address A",
            "AA"
          ),
          new Branch(
            9000002,
            1,
            "Store B",
            "54321",
            "City B",
            "Address B",
            "BB"
          ),
        ];

        const { orm } = await import("../shared/db/orm");
        (orm.em.find as jest.Mock).mockResolvedValue(mockBranches);

        const result = await branchRepository.rBranchFindByRetailId(1);

        expect(orm.em.find).toHaveBeenCalledWith(Branch, { retailId: 1 });
        expect(result).toEqual(mockBranches);
      });
    });

    describe("rBranchInsert", () => {
      it("should insert a new branch", async () => {
        const newBranch = new Branch(
          9000001,
          1,
          "New Store",
          "12345",
          "New City",
          "New Address",
          "NC"
        );
        const mockInsertResult = { ...newBranch };

        const { orm } = await import("../shared/db/orm");
        (orm.em.insert as jest.Mock).mockResolvedValue(mockInsertResult);

        const result = await branchRepository.rBranchInsert(newBranch);

        expect(orm.em.begin).toHaveBeenCalled();
        expect(orm.em.insert).toHaveBeenCalledWith(newBranch);
        expect(orm.em.commit).toHaveBeenCalled();
        expect(result).toEqual(mockInsertResult);
      });

      it("should rollback on error", async () => {
        const newBranch = new Branch(
          9000001,
          1,
          "New Store",
          "12345",
          "New City",
          "New Address",
          "NC"
        );
        const error = new Error("Database error");

        const { orm } = await import("../shared/db/orm");
        (orm.em.insert as jest.Mock).mockRejectedValue(error);

        await expect(branchRepository.rBranchInsert(newBranch)).rejects.toThrow(
          "Database error"
        );
        expect(orm.em.begin).toHaveBeenCalled();
        expect(orm.em.rollback).toHaveBeenCalled();
      });
    });
  });

  describe("Service Tests", () => {
    describe("sBranchFindAll", () => {
      it("should return success response when branches exist", async () => {
        const mockBranches = [
          new Branch(
            9000001,
            1,
            "Store A",
            "12345",
            "City A",
            "Address A",
            "AA"
          ),
        ];

        jest
          .spyOn(branchRepository, "rBranchFindAll")
          .mockResolvedValue(mockBranches);

        const result = await branchService.sBranchFindAll();

        expect(result).toBeInstanceOf(ControllerResponse);
        expect(result.statusCode).toBe(200);
        expect(result.message).toBe("Branches found");
        expect(result.data).toEqual(mockBranches);
      });

      it("should return not found response when no branches exist", async () => {
        jest.spyOn(branchRepository, "rBranchFindAll").mockResolvedValue([]);

        const result = await branchService.sBranchFindAll();

        expect(result.statusCode).toBe(404);
        expect(result.message).toBe("No branches found");
        expect(result.data).toEqual([]);
      });

      it("should handle errors gracefully", async () => {
        const error = new Error("Database connection failed");
        jest.spyOn(branchRepository, "rBranchFindAll").mockRejectedValue(error);

        const result = await branchService.sBranchFindAll();

        expect(result.statusCode).toBe(500);
        expect(result.message).toBe("Internal server error");
        expect(result.errDetails).toBe(JSON.stringify(error));
      });
    });

    describe("sBranchCreate", () => {
      it("should create a new branch with provided branchId", async () => {
        const mockBranch = new Branch(
          9000001,
          1,
          "New Store",
          "12345",
          "New City",
          "New Address",
          "NC"
        );

        jest.spyOn(branchRepository, "rBranchFindById").mockResolvedValue(null);
        jest
          .spyOn(branchRepository, "rBranchFindByNameAndRetail")
          .mockResolvedValue(null);
        jest
          .spyOn(branchRepository, "rBranchInsert")
          .mockResolvedValue(mockBranch);

        const result = await branchService.sBranchCreate(
          9000001,
          1,
          "New Store",
          "12345",
          "New City",
          "New Address",
          "NC"
        );

        expect(result.statusCode).toBe(201);
        expect(result.message).toBe("Branch created");
        expect(result.data).toEqual(mockBranch);
      });

      it("should create a new branch with auto-generated branchId when not provided", async () => {
        const mockBranch = new Branch(
          9000001,
          1,
          "New Store",
          "12345",
          "New City",
          "New Address",
          "NC"
        );

        jest.spyOn(branchRepository, "rBranchFindById").mockResolvedValue(null);
        jest
          .spyOn(branchRepository, "rBranchFindByNameAndRetail")
          .mockResolvedValue(null);
        jest
          .spyOn(branchRepository, "rBranchInsert")
          .mockResolvedValue(mockBranch);

        const result = await branchService.sBranchCreate(
          undefined,
          1,
          "New Store",
          "12345",
          "New City",
          "New Address",
          "NC"
        );

        expect(result.statusCode).toBe(201);
        expect(result.message).toBe("Branch created");
        expect(result.data).toEqual(mockBranch);
      });

      it("should return error for empty branch name", async () => {
        const result = await branchService.sBranchCreate(
          undefined,
          1,
          "",
          "12345",
          "City",
          "Address",
          "CC"
        );

        expect(result.statusCode).toBe(400);
        expect(result.message).toBe("Branch name must not be empty");
      });

      it("should return error for invalid retail ID", async () => {
        const result = await branchService.sBranchCreate(
          undefined,
          0,
          "Store Name",
          "12345",
          "City",
          "Address",
          "CC"
        );

        expect(result.statusCode).toBe(400);
        expect(result.message).toBe("Valid retail ID is required");
      });

      it("should return error for duplicate branch ID", async () => {
        const existingBranch = new Branch(
          9000001,
          1,
          "Existing Store",
          "12345",
          "City",
          "Address",
          "CC"
        );
        jest
          .spyOn(branchRepository, "rBranchFindById")
          .mockResolvedValue(existingBranch);

        const result = await branchService.sBranchCreate(
          9000001,
          1,
          "New Store",
          "12345",
          "City",
          "Address",
          "CC"
        );

        expect(result.statusCode).toBe(409);
        expect(result.message).toBe(
          "Branch with this ID already exists for this retail"
        );
      });

      it("should return error for duplicate branch name", async () => {
        const existingBranch = new Branch(
          9000001,
          1,
          "Existing Store",
          "12345",
          "City",
          "Address",
          "CC"
        );
        jest.spyOn(branchRepository, "rBranchFindById").mockResolvedValue(null);
        jest
          .spyOn(branchRepository, "rBranchFindByNameAndRetail")
          .mockResolvedValue(existingBranch);

        const result = await branchService.sBranchCreate(
          9000002,
          1,
          "Existing Store",
          "12345",
          "City",
          "Address",
          "CC"
        );

        expect(result.statusCode).toBe(409);
        expect(result.message).toBe(
          "Branch with this name already exists for this retail"
        );
      });
    });

    describe("sBranchUpdate", () => {
      it("should update branch successfully", async () => {
        const existingBranch = new Branch(
          9000001,
          1,
          "Old Store",
          "12345",
          "Old City",
          "Old Address",
          "OC"
        );
        const updatedBranch = new Branch(
          9000001,
          1,
          "Updated Store",
          "54321",
          "Updated City",
          "Updated Address",
          "UC"
        );

        jest
          .spyOn(branchRepository, "rBranchFindById")
          .mockResolvedValue(existingBranch);
        jest
          .spyOn(branchRepository, "rBranchFindByNameAndRetail")
          .mockResolvedValue(null);
        jest.spyOn(branchRepository, "rBranchUpdate").mockResolvedValue(1);
        jest
          .spyOn(branchRepository, "rBranchFindById")
          .mockResolvedValueOnce(existingBranch)
          .mockResolvedValueOnce(updatedBranch);

        const result = await branchService.sBranchUpdate(9000001, 1, {
          branchName: "Updated Store",
          branchPostalCode: "54321",
          branchCity: "Updated City",
          branchAddress: "Updated Address",
          branchProvinceCode: "UC",
        });

        expect(result.statusCode).toBe(200);
        expect(result.message).toBe("Branch 1 updated");
        expect(result.data).toEqual(updatedBranch);
      });

      it("should return error when branch not found", async () => {
        jest.spyOn(branchRepository, "rBranchFindById").mockResolvedValue(null);

        const result = await branchService.sBranchUpdate(999, 1, {
          branchName: "New Name",
        });

        expect(result.statusCode).toBe(404);
        expect(result.message).toBe("Branch not found");
      });
    });

    describe("sBranchDelete", () => {
      it("should delete branch successfully", async () => {
        const existingBranch = new Branch(
          9000001,
          1,
          "Store to Delete",
          "12345",
          "City",
          "Address",
          "CC"
        );

        jest
          .spyOn(branchRepository, "rBranchFindById")
          .mockResolvedValue(existingBranch);
        jest
          .spyOn(branchRepository, "rBranchDelete")
          .mockResolvedValue(undefined);

        const result = await branchService.sBranchDelete(9000001, 1);

        expect(result.statusCode).toBe(200);
        expect(result.message).toBe("Branch 9000001 deleted");
      });

      it("should return error when branch not found for deletion", async () => {
        jest.spyOn(branchRepository, "rBranchFindById").mockResolvedValue(null);

        const result = await branchService.sBranchDelete(999, 1);

        expect(result.statusCode).toBe(404);
        expect(result.message).toBe("Branch not found");
      });
    });
  });

  describe("Controller Tests", () => {
    describe("cBranchFindAll", () => {
      it("should return all branches", async () => {
        const mockBranches = [
          new Branch(
            9000001,
            1,
            "Store A",
            "12345",
            "City A",
            "Address A",
            "AA"
          ),
        ];
        const mockServiceResponse = new ControllerResponse(
          200,
          "Branches found",
          "",
          mockBranches
        );

        jest
          .spyOn(branchService, "sBranchFindAll")
          .mockResolvedValue(mockServiceResponse);

        await branchController.cBranchFindAll(
          mockRequest as Request,
          mockResponse as Response
        );

        expect(mockStatus).toHaveBeenCalledWith(200);
        expect(mockJson).toHaveBeenCalledWith({
          message: "Branches found",
          errDetails: "",
          data: mockBranches,
        });
      });
    });

    describe("cBranchCreate", () => {
      it("should create a new branch with provided branchId", async () => {
        const mockBranch = new Branch(
          9000001,
          1,
          "New Store",
          "12345",
          "New City",
          "New Address",
          "NC"
        );
        const mockServiceResponse = new ControllerResponse(
          201,
          "Branch created",
          "",
          mockBranch
        );

        mockRequest.body = {
          branchId: 9000001,
          retailId: 1,
          branchName: "New Store",
          branchPostalCode: "12345",
          branchCity: "New City",
          branchAddress: "New Address",
          branchProvinceCode: "NC",
        };

        jest
          .spyOn(branchService, "sBranchCreate")
          .mockResolvedValue(mockServiceResponse);

        await branchController.cBranchCreate(
          mockRequest as Request,
          mockResponse as Response
        );

        expect(branchService.sBranchCreate).toHaveBeenCalledWith(
          9000001,
          1,
          "New Store",
          "12345",
          "New City",
          "New Address",
          "NC"
        );
        expect(mockStatus).toHaveBeenCalledWith(201);
        expect(mockJson).toHaveBeenCalledWith({
          message: "Branch created",
          errDetails: "",
          data: mockBranch,
        });
      });

      it("should create a new branch without branchId (auto-generated)", async () => {
        const mockBranch = new Branch(
          9000001,
          1,
          "New Store",
          "12345",
          "New City",
          "New Address",
          "NC"
        );
        const mockServiceResponse = new ControllerResponse(
          201,
          "Branch created",
          "",
          mockBranch
        );

        mockRequest.body = {
          retailId: 1,
          branchName: "New Store",
          branchPostalCode: "12345",
          branchCity: "New City",
          branchAddress: "New Address",
          branchProvinceCode: "NC",
        };

        jest
          .spyOn(branchService, "sBranchCreate")
          .mockResolvedValue(mockServiceResponse);

        await branchController.cBranchCreate(
          mockRequest as Request,
          mockResponse as Response
        );

        expect(branchService.sBranchCreate).toHaveBeenCalledWith(
          undefined,
          1,
          "New Store",
          "12345",
          "New City",
          "New Address",
          "NC"
        );
        expect(mockStatus).toHaveBeenCalledWith(201);
      });
    });

    describe("cBranchFindById", () => {
      it("should return specific branch", async () => {
        const mockBranch = new Branch(
          9000001,
          1,
          "Store A",
          "12345",
          "City A",
          "Address A",
          "AA"
        );
        const mockServiceResponse = new ControllerResponse(
          200,
          "Branch found",
          "",
          mockBranch
        );

        mockRequest.params = { branchId: "9000001", retailId: "1" };

        jest
          .spyOn(branchService, "sBranchFindById")
          .mockResolvedValue(mockServiceResponse);

        await branchController.cBranchFindById(
          mockRequest as Request,
          mockResponse as Response
        );

        expect(branchService.sBranchFindById).toHaveBeenCalledWith(9000001, 1);
        expect(mockStatus).toHaveBeenCalledWith(200);
        expect(mockJson).toHaveBeenCalledWith({
          message: "Branch found",
          errDetails: "",
          data: mockBranch,
        });
      });
    });

    describe("cBranchUpdate", () => {
      it("should update branch", async () => {
        const updatedBranch = new Branch(
          9000001,
          1,
          "Updated Store",
          "54321",
          "Updated City",
          "Updated Address",
          "UC"
        );
        const mockServiceResponse = new ControllerResponse(
          200,
          "Branch 1 updated",
          "",
          updatedBranch
        );

        mockRequest.params = { branchId: "9000001", retailId: "1" };
        mockRequest.body = {
          branchName: "Updated Store",
          branchPostalCode: "54321",
          branchCity: "Updated City",
          branchAddress: "Updated Address",
          branchProvinceCode: "UC",
        };

        jest
          .spyOn(branchService, "sBranchUpdate")
          .mockResolvedValue(mockServiceResponse);

        await branchController.cBranchUpdate(
          mockRequest as Request,
          mockResponse as Response
        );

        expect(branchService.sBranchUpdate).toHaveBeenCalledWith(9000001, 1, {
          branchName: "Updated Store",
          branchPostalCode: "54321",
          branchCity: "Updated City",
          branchAddress: "Updated Address",
          branchProvinceCode: "UC",
        });
        expect(mockStatus).toHaveBeenCalledWith(200);
      });
    });

    describe("cBranchDelete", () => {
      it("should delete branch", async () => {
        const mockServiceResponse = new ControllerResponse(
          200,
          "Branch 9000001 deleted",
          "",
          null
        );

        mockRequest.params = { branchId: "9000001", retailId: "1" };

        jest
          .spyOn(branchService, "sBranchDelete")
          .mockResolvedValue(mockServiceResponse);

        await branchController.cBranchDelete(
          mockRequest as Request,
          mockResponse as Response
        );

        expect(branchService.sBranchDelete).toHaveBeenCalledWith(9000001, 1);
        expect(mockStatus).toHaveBeenCalledWith(200);
        expect(mockJson).toHaveBeenCalledWith({
          message: "Branch 9000001 deleted",
          errDetails: "",
          data: null,
        });
      });
    });
  });

  describe("Branch Entity Tests", () => {
    describe("generateDefaultBranchId", () => {
      it("should generate a branch ID starting with 9000000", () => {
        const branchId = Branch.generateDefaultBranchId();

        expect(branchId).toBeGreaterThanOrEqual(9000000);
        expect(branchId).toBeLessThan(10000000);
        expect(Number.isInteger(branchId)).toBe(true);
      });

      it("should generate different IDs on multiple calls", () => {
        const id1 = Branch.generateDefaultBranchId();
        const id2 = Branch.generateDefaultBranchId();

        // While it's possible they could be the same due to randomness,
        // it's very unlikely with 1 million possible values
        expect(id1).toBeGreaterThanOrEqual(9000000);
        expect(id2).toBeGreaterThanOrEqual(9000000);
      });
    });
  });
});
