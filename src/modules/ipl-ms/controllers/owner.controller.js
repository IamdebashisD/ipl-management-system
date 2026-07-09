import * as ownerService from "../services/owner.service.js"
import ApiError from "../../../common/utils/api-error.js";
import ApiResponse from "../../../common/utils/api-response.js"


const createOwner = async (req, res) => {
    const owner = await ownerService.createOwner(req.body)
    ApiResponse.created(res, "Owner created successfully", owner)
};
 
const getAllOwners = async (req, res) => {
    const owners = await ownerService.getAllOwners()
    ApiResponse.ok(res, "Owners fetched successfully", owners)
};

const getOwnerById = async (req, res) => {
    if (!req.params) {
        throw ApiError.badRequest("URL parameter is required")
    }
    const { id } = req.params
    const owner = await ownerService.getOwnerById(id)
    ApiResponse.ok(res, "Owner fetched successfully", owner)
};

const updateOwner = async (req, res) => {
    if (!req.params) {
        throw ApiError.badRequest("URL parameter is required")
    }
    const { id } = req.params
    const updatedOwner = await ownerService.updateOwner(id, req.body)
    ApiResponse.ok(res, "Owner updated successfully", updatedOwner)
};

const deleteOwner = async(req, res) => {
    const deletedOwner = await ownerService.deleteOwner(req.params.id)
    ApiResponse.ok(res, "Owner deleted successfully", deletedOwner)
};

export {
    createOwner,
    getAllOwners,
    getOwnerById,
    updateOwner,
    deleteOwner
}