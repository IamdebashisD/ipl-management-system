import PlayerStats from "../models/player-stats.model.js";
import Player from "../models/player.model.js"
import ApiError from "../../../common/utils/api-error.js";

const createPlayerStats = async (playerId) => {
    
    const player = await Player.findById(playerId)
    if (!player) {
        throw ApiError.notFound("Player not found")
    }

    const existingStats = await PlayerStats.findOne({ playerId })
    if (existingStats) {
        throw ApiError.notFound("Stats already exist")
    }

    return await PlayerStats.create({ 
        playerId 
    })
}

const updatePlayerStats = async (
    playerId,
    { runs, wickets, catches, matchesPlayed }
) => {

    const stats = await PlayerStats.findOneAndUpdate(
        { playerId },
        { runs, wickets, catches, matchesPlayed },
        { returnDocument: 'after', runValidators: true }
    )

    if (!stats) {
        throw ApiError.notFound("Player stats not found")
    }

    return stats
}

const getPlayerStats = async (playerId) => {

    const stats = await PlayerStats.findOne({ playerId }).populate("playerId", "name role")

    if (!stats) {
        throw ApiError.notFound("Player stats not found")
    }

    return stats
}

const getAllPlayerStats = async () => {
    return await PlayerStats
        .find()
        .populate("playerId", "name role")
        .sort({ createdAt: -1 })
}


const deletePlayerStats = async (playerId) => {

    const stats = await PlayerStats.findOneAndDelete({ playerId })
    if (!stats) {
        throw ApiError.notFound("Player stats not found")
    }
    return null
}



export {
    createPlayerStats,
    updatePlayerStats,
    getPlayerStats,
    getAllPlayerStats,
    deletePlayerStats
}