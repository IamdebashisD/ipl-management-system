import ApiError from "../../../common/utils/api-error.js";
import ApiResponse from "../../../common/utils/api-response.js";
import * as teamBroadcasterService from "../services/team-broadcaster.service.js"


const assignBroadcaster = async (req, res) => {
    const teamBroadcaster = await teamBroadcasterService.assignBroadcaster(req.body)
    ApiResponse.created(
        res,
        "Broadcaster assigned to team successfully",
        teamBroadcaster
    )
}

const updateBroadcaster = async (req, res) => {
    if (!req.params) {
        throw ApiError.badRequest("URL parameter is required")
    }
    
    const { id } = req.params
    if (!id) throw ApiError.badRequest("ID is required")
    
    const updateRelation = await teamBroadcasterService.updateBroadcaster(id, req.body)
    ApiResponse.ok(
        res,
        "Team Broadcaster updated successfully",
        updateRelation
    )
}

const getBroadcasterByTeam = async (req, res) => {
    if (!req.params.id) {
        throw ApiError.badRequest("Team ID is required")
    }

    const broadcasters = await teamBroadcasterService.getBroadcasterByTeam(req.params.id)
    ApiResponse.ok(
        res, 
        "Broadcasters fetched successfully",
        broadcasters
    )
}

const getTeamByBroadcaster = async (req, res) => {
    if (!req.params.id) {
        throw ApiError.badRequest("Broadcaster ID is required")
    }

    const teams = await teamBroadcasterService.getTeamByBroadcaster(req.params.id)
    ApiResponse.ok(
        res,
        "Teams fetched is successfully",
        teams
    )
}

const removeBroadcaster = async (req, res) => {
    const { teamId, broadcasterId } = req.params
    if (!teamId) {
        throw ApiError("Team ID is required")
    }
    if (!broadcasterId) {
        throw ApiError("Broadcaster ID is required")
    }

    await teamBroadcasterService.removeBroadcaster(teamId, broadcasterId)

    ApiResponse.ok(
        res,
        "Broadcaster removed successfully"
    )
}

const getAllBroadcasters = async (req, res) => {
    const broadcasters = await teamBroadcasterService.getAllTeamBroadcaster()
    ApiResponse.ok(
        res,
        "All broadcasters fetched successfully",
        broadcasters
    )
}

export { 
    assignBroadcaster, 
    updateBroadcaster, 
    getBroadcasterByTeam, 
    getTeamByBroadcaster, 
    removeBroadcaster,
    getAllBroadcasters
}