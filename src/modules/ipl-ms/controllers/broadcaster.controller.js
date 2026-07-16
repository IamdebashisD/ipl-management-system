import ApiError from "../../../common/utils/api-error.js"
import ApiResponse from "../../../common/utils/api-response.js"
import * as broadcasterService from "../services/broadcaster.service.js"


const createBroadcaster = async (req, res) => {
    if (!req.body) throw ApiError.badRequest("Broadcaster data is required")

    const broadcaster = await broadcasterService.createBroadcaster(req.body)
    ApiResponse.created(res, "Broadcaster created successfully", broadcaster)
}

const getAllBroadcaster = async (req, res) => {
    const broadcasters = await broadcasterService.getAllBroadcaster()
    ApiResponse.ok(res, "Broadcasters fetched successsfully")
}

const getBroadcasterById = async (req, res) => {
    if (!req.params.id) throw ApiError.badRequest("Broadcaster ID is required")

    const broadcaster = await broadcasterService.getBroadcasterById(req.params.id)

    ApiResponse.ok(res, "Broadcaster fetched successfully", broadcaster)
}

const updateBroadcaster = async (req, res) =>  {
    if (!req.params.id) {
        throw ApiError.badRequest("Broadcaster is required")
    }
    if (!req.body || Object.keys(req.body).length === 0) {
        throw ApiError.badRequest("Broadcaster data is required")
    }

    const broadcaster = await broadcasterService.updateBroadcaster(req.params.id, req.body)
    ApiResponse.ok(res, "Broadcaster updated successfully", broadcaster)
}

const deleteBroadcster = async (req, res) => {
    if (req.params.id) {
        throw ApiError.badRequest("Broadcaster ID is required")
    }

    await broadcasterService.deleteBroadcaster(req.params.id)

    ApiResponse.ok(res, "Broadcaster deleted successfully")
}

const getBroadcasterByName = async (req, res) => {
    if (!req.params.name) throw ApiError.badRequest("Broadcaster name is required")
    
    const broadcaster = await broadcasterService.getBroadcasterByName(req.params.name)

    ApiResponse.ok(res, "Broadcaster fetched successfully", broadcaster)
}

const searchBroadcasters = async (req, res) => {
    const { name } = req.query
    if (!name) throw ApiError.badRequest("Broadcaster name is required")
    
    const brodcasters = await broadcasterService.searchBroadcasters(name)

    ApiResponse.ok(res, "Broadcaster fetched successfully", brodcasters)
}


export {
    createBroadcaster,
    getAllBroadcaster,
    getBroadcasterById,
    updateBroadcaster,
    deleteBroadcster,
    getBroadcasterByName,
    searchBroadcasters
}