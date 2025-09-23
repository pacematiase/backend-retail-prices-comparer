import { request, response } from "express";
import {
  sBranchFindAll,
  sBranchFindById,
  sBranchFindByRetailId,
  sBranchCreate,
  sBranchUpdate,
  sBranchDelete,
} from "./service.js";

export async function cBranchFindAll(req = request, res = response) {
  const result = await sBranchFindAll();
  res.status(result.statusCode).json({
    message: result.message,
    errDetails: result.errDetails,
    data: result.data,
  });
}

export async function cBranchFindById(req = request, res = response) {
  const { branchId, retailId } = req.params;
  const branch = await sBranchFindById(Number(branchId), Number(retailId));
  res.status(branch.statusCode).json({
    message: branch.message,
    errDetails: branch.errDetails,
    data: branch.data,
  });
}

export async function cBranchFindByRetailId(req = request, res = response) {
  const { retailId } = req.params;
  const branches = await sBranchFindByRetailId(Number(retailId));
  res.status(branches.statusCode).json({
    message: branches.message,
    errDetails: branches.errDetails,
    data: branches.data,
  });
}

export async function cBranchCreate(req = request, res = response) {
  const {
    branchId,
    retailId,
    branchName,
    branchPostalCode,
    branchCity,
    branchAddress,
    branchProvinceCode,
  } = req.body;

  const branch = await sBranchCreate(
    branchId,
    retailId,
    branchName,
    branchPostalCode,
    branchCity,
    branchAddress,
    branchProvinceCode
  );

  res.status(branch.statusCode).json({
    message: branch.message,
    errDetails: branch.errDetails,
    data: branch.data,
  });
}

export async function cBranchUpdate(req = request, res = response) {
  const { branchId, retailId } = req.params;
  const {
    branchName,
    branchPostalCode,
    branchCity,
    branchAddress,
    branchProvinceCode,
  } = req.body;

  const updateData = {
    branchName,
    branchPostalCode,
    branchCity,
    branchAddress,
    branchProvinceCode,
  };

  const updatedBranch = await sBranchUpdate(
    Number(branchId),
    Number(retailId),
    updateData
  );
  res.status(updatedBranch.statusCode).json({
    message: updatedBranch.message,
    errDetails: updatedBranch.errDetails,
    data: updatedBranch.data,
  });
}

export async function cBranchDelete(req = request, res = response) {
  const { branchId, retailId } = req.params;
  const result = await sBranchDelete(Number(branchId), Number(retailId));
  res.status(result.statusCode).json({
    message: result.message,
    errDetails: result.errDetails,
    data: result.data,
  });
}
