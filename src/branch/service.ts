import { ControllerResponse } from "../shared/classes/controllerResponse.js";
import {
  rBranchDelete,
  rBranchFindAll,
  rBranchFindById,
  rBranchFindByRetailId,
  rBranchFindByNameAndRetail,
  rBranchInsert,
  rBranchUpdate,
} from "./repository.js";
import { Branch } from "./entity.js";

export async function sBranchFindAll(): Promise<
  ControllerResponse<Branch[] | null>
> {
  try {
    const branches = await rBranchFindAll();
    if (branches && branches.length > 0) {
      return new ControllerResponse(200, "Branches found", "", branches);
    } else {
      return new ControllerResponse(404, "No branches found", null, []);
    }
  } catch (error) {
    return new ControllerResponse<Branch[]>(
      500,
      "Internal server error",
      JSON.stringify(error),
      []
    );
  }
}

export async function sBranchFindById(
  branchId: number,
  retailId: number
): Promise<ControllerResponse<Branch | null>> {
  try {
    const branch = await rBranchFindById(branchId, retailId);
    if (branch) {
      return new ControllerResponse<Branch | null>(
        200,
        "Branch found",
        "",
        branch
      );
    } else {
      return new ControllerResponse<Branch | null>(
        404,
        "Branch not found",
        null,
        null
      );
    }
  } catch (error) {
    return new ControllerResponse<Branch | null>(
      500,
      "Internal server error",
      JSON.stringify(error),
      null
    );
  }
}

export async function sBranchFindByRetailId(
  retailId: number
): Promise<ControllerResponse<Branch[] | null>> {
  try {
    const branches = await rBranchFindByRetailId(retailId);
    if (branches && branches.length > 0) {
      return new ControllerResponse<Branch[] | null>(
        200,
        "Branches found",
        "",
        branches
      );
    } else {
      return new ControllerResponse<Branch[] | null>(
        404,
        "No branches found for this retail",
        null,
        []
      );
    }
  } catch (error) {
    return new ControllerResponse<Branch[] | null>(
      500,
      "Internal server error",
      JSON.stringify(error),
      []
    );
  }
}

export async function sBranchCreate(
  branchId: number | undefined,
  retailId: number,
  branchName: string,
  branchPostalCode?: string,
  branchCity?: string,
  branchAddress?: string,
  branchProvinceCode?: string
): Promise<ControllerResponse<Branch | null>> {
  try {
    if (!branchName || branchName.trim() === "") {
      return new ControllerResponse<Branch | null>(
        400,
        "Branch name must not be empty",
        null,
        null
      );
    }

    if (!retailId || retailId <= 0) {
      return new ControllerResponse<Branch | null>(
        400,
        "Valid retail ID is required",
        null,
        null
      );
    }

    // Generate branchId if not provided
    const finalBranchId = branchId || Branch.generateDefaultBranchId();

    // Check if branchId already exists for this retail
    const existingBranchById = await rBranchFindById(finalBranchId, retailId);
    if (existingBranchById) {
      return new ControllerResponse<Branch | null>(
        409,
        "Branch with this ID already exists for this retail",
        JSON.stringify(existingBranchById),
        null
      );
    }

    const existingBranch = await rBranchFindByNameAndRetail(
      branchName,
      retailId
    );
    if (existingBranch) {
      return new ControllerResponse<Branch | null>(
        409,
        "Branch with this name already exists for this retail",
        JSON.stringify(existingBranch),
        null
      );
    }

    const newBranch = new Branch(
      finalBranchId,
      retailId,
      branchName,
      branchPostalCode || "",
      branchCity || "",
      branchAddress || "",
      branchProvinceCode || ""
    );

    const insertResult = await rBranchInsert(newBranch);

    return new ControllerResponse<Branch | null>(
      201,
      "Branch created",
      "",
      insertResult
    );
  } catch (error) {
    return new ControllerResponse<Branch | null>(
      500,
      "Internal server error",
      JSON.stringify(error),
      null
    );
  }
}

export async function sBranchUpdate(
  branchId: number,
  retailId: number,
  updateData: {
    branchName?: string;
    branchPostalCode?: string;
    branchCity?: string;
    branchAddress?: string;
    branchProvinceCode?: string;
  }
): Promise<ControllerResponse<Branch | null>> {
  try {
    const branch = await rBranchFindById(branchId, retailId);
    if (!branch) {
      return new ControllerResponse<Branch | null>(
        404,
        "Branch not found",
        null,
        null
      );
    }

    // Check if branch name is being updated and if it conflicts with existing branch
    if (updateData.branchName && updateData.branchName !== branch.branchName) {
      const existingBranch = await rBranchFindByNameAndRetail(
        updateData.branchName,
        retailId
      );
      if (existingBranch) {
        return new ControllerResponse<Branch | null>(
          409,
          "Branch with this name already exists for this retail",
          JSON.stringify(existingBranch),
          null
        );
      }
    }

    const updateResult = await rBranchUpdate(branchId, retailId, updateData);
    const updatedBranch = await rBranchFindById(branchId, retailId);

    return new ControllerResponse<Branch | null>(
      200,
      `Branch ${updateResult} updated`,
      "",
      updatedBranch
    );
  } catch (error) {
    return new ControllerResponse<Branch | null>(
      500,
      "Internal server error",
      JSON.stringify(error),
      null
    );
  }
}

export async function sBranchDelete(
  branchId: number,
  retailId: number
): Promise<ControllerResponse<Branch | null>> {
  try {
    const branch = await rBranchFindById(branchId, retailId);
    if (!branch) {
      return new ControllerResponse<Branch | null>(
        404,
        "Branch not found",
        null,
        null
      );
    }

    await rBranchDelete(branchId, retailId);
    return new ControllerResponse(200, `Branch ${branchId} deleted`, "", null);
  } catch (error) {
    return new ControllerResponse<Branch | null>(
      500,
      "Internal server error",
      JSON.stringify(error),
      null
    );
  }
}
