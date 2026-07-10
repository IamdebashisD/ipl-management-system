import ApiResponse from "../../../common/utils/api-response.js";
import ApiError from "../../../common/utils/api-error.js";
import * as teamService from "../services/team.service.js"


const createTeam = async (req, res) => {
    const team = await teamService.createTeam(req.body)
    ApiResponse.created(res, "Team created successfully", team)
}

const getTeamById = async (req, res) => {
    if (!req.params.id) {
        throw ApiError.badRequest("Team ID is required")
    }
    const team = await teamService.getTeamById(req.params.id)
    ApiResponse.ok(res, "Team fetched successfully", team)
}

const getAllTeam =  async (req, res) => {
    const teams = await teamService.getAllTeam()
    
    ApiResponse.ok(res, "Teams fetched successfully", teams)
}

const updateTeam = async (req, res) => {

    if (!req.params.id) {
        throw ApiError.badRequest("Team ID is required")
    }
    const updatedTeam = await teamService.updateTeam(req.params.id, req.body)
    ApiResponse.ok(res, "Team updated successfully", updatedTeam)
}

const deleteTeam = async (req, res) => {
    if (!req.params.id) {
        throw ApiError.badRequest("Team ID is required")
    }
    const deletedTeam = await teamService.deleteTeam(req.params.id)
    ApiResponse.ok(res, "Team deleted successfully", deletedTeam)
}

const getTeamByOwnerId = async (req, res) => {
    if (!req.params.ownerId) {
        throw ApiError.badRequest("Owner ID is required")
    }
    const team = await teamService.getTeamByOwnerId(req.params.ownerId)
    ApiResponse.ok(
        res,
        "Team fetched succssfully",
        team
    )
}


export {
    createTeam,
    getTeamById,
    getAllTeam,
    updateTeam,
    deleteTeam
}