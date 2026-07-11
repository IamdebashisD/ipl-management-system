import ApiResponse from "../../../common/utils/api-response.js";
import * as playerService from "../services/player.service.js"


const createPlayer = async (req, res) => {
    if (!req.body || Object.keys(req.body).length === 0) throw ApiError.badRequest("Player data is required")
    const player = await playerService.createPlayer(req.body)
    ApiResponse.created(res, "Player created successfully", player)
}

const getPlayerById = async (req, res) => {
    if (!req.params.id) throw ApiError.badRequest("Player ID is required")
    const player = await playerService.getPlayerById(req.params.id)
    ApiResponse.ok(res, "Player fetched successfully", player)
}

const getAllPlayers = async (req, res) => {
    const players = await playerService.getAllPlayers()
    ApiResponse.ok(res, "Players fetched successfully", players)
}

const updatePlayer = async (req, res) => {
    if (!req.params.id) throw ApiError.badRequest("Player ID is required")
    if (!req.body || Object.keys(req.body).length === 0) throw ApiError.badRequest("Player data is required")

    const updatePlayer = await playerService.updatePlayer(req.params.id, req.body)
    ApiResponse.ok(res, "Player update successfully", updatePlayer)
}

const deletePlayer = async (req, res) => {
    if (!req.params.id) throw ApiError.badRequest("Player ID is required")
    await playerService.deletePlayer(req.params.id)
    ApiResponse.ok(res, "Player deleted successfully")
}

const transferTeam = async (req, res) => {
    const { playerId } = req.params
    const { newTeamId } = req.body
    
    const player = await playerService.transferTeam(playerId, newTeamId)
    ApiResponse.ok(res, "Player transferred successfully", player)
}


export {
    createPlayer,
    getAllPlayers,
    getPlayerById,
    updatePlayer,
    deletePlayer,
    transferTeam,
}