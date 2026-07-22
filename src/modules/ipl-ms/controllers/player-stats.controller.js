import ApiResponse from "../../../common/utils/api-response.js"
import ApiError from "../../../common/utils/api-error.js"
import * as playerStatsService from "../services/player-stats.service.js"

const createPlayerStats = async (req, res) => {
    const { playerId } = req.params
    if (!playerId) {
        throw ApiError.badRequest("Player Id is required")
    }

    const playerStats = await playerStatsService.createPlayerStats(playerId)

    ApiResponse.created(
        res,
        "Player stats created successfully",
        playerStats
    )
}

const updatePlayerStats = async (req, res) => {
    const { playerId } = req.params
    
    if (!playerId) {
        throw ApiError.badRequest("Player ID is required")
    }

    if (!req.body || Object.keys(req.body).length === 0) {
        throw ApiError.badRequest("Player stats data is required")
    }

    const playerStats = await playerStatsService.updatePlayerStats(playerId, req.body)

    ApiResponse.ok(
        res,
        "Player stats updated successfully",
        playerStats
    )
}

const getPlayerStats = async (req, res) =>  {
    const { playerId } = req.params
    if (!playerId) {
        throw ApiError.badRequest("Player ID is required")
    }
    
    const playerStats = await playerStatsService.getPlayerStats(playerId)
    
    ApiResponse.ok(
        res,
        "Player stats fetched successfully",
        playerStats
    )
}

const getAllPlayerStats = async (req, res) => {
    const playersStats = await playerStatsService.getAllPlayersStats()
    ApiResponse.ok(
        res,
        "Players stats fetched successfully",
        playersStats
    )
}

const deletePlayerStats = async (req, res) => {
    const { playerId } = req.params
    if (!playerId) {
        throw ApiError.badRequest("Player ID is required")
    }

    await playerStatsService.deletePlayerStats(playerId)

    ApiResponse.ok(
        res,
        "Player stats deleted successfully"
    )
}

export {
    createPlayerStats,
    updatePlayerStats,
    getPlayerStats,
    getAllPlayerStats,
    deletePlayerStats
}