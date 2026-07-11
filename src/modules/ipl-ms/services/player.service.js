import ApiError from "../../../common/utils/api-error.js"
import Player from "../models/player.model.js"
import Team from "../models/team.model.js"


// CREATE, READ, UPDATE, DELETE Players

const createPlayer = async ({ name, role, teamId }) =>  {
    const team = await Team.findById(teamId)
    if (!team) {
        throw ApiError.notFound("Team not found")
    }

    const playerExistsInTeam = await Player.findOne({ name, teamId })
    if (playerExistsInTeam) {
        throw ApiError.conflict("Player with the same name already exists in this team")
    }

    const player = await Player.create({ name, role, teamId })
    return player
}

const getPlayerById = async (playerId) => {
    const player = await Player.findById(playerId).populate("teamId", "name")
    if (!player) {
        throw ApiError.notFound("Player not found")
    }
    return player
}

const getAllPlayers = async () => {
    const players = await Player.find().populate("teamId", "name")
    return players
}

const updatePlayer = async (playerId, updateData) => {
    if (updateData.teamId) {
        const team = await Team.findById(updateData.teamId)
        if (!team) {
            throw ApiError.notFound("Team not found")
        }
    }

    const player = await Player.findByIdAndUpdate(
        playerId, 
        updateData, 
        { new: true, runValidators: true }
    ).populate("teamId", "name")

    if (!player) {
        throw ApiError.notFound("Player not found")
    }

    return player
}

const deletePlayer = async (playerId) => {
    const player = await Player.findByIdAndDelete(playerId)
    if (!player) {
        throw ApiError.notFound("Player not found")
    }
    return null
}


const transferTeam = async (playerId, newTeamId) => {
    const team = await Team.findById(newTeamId)
    if (!team) throw ApiError.notFound("Team not found!")

    const player = await Player.findByIdAndUpdate(
        playerId,
        { teamId: newTeamId },
        { new: true, runValidators: true }
    ).populate("teamId", "name")

    if (!player) throw ApiError.notFound("Player not found!")

    return player
}

const getPlayersByTeam = async (teamId) => {
    const players = await Player
        .find({ teamId })
        .populate("teamId", "name")

    if (!players || players.length === 0) throw ApiError.notFound("Player not found")
    
    return players
}

const updatePlayerRole = async (playerId, role) => {
    const player = await Player.findByIdAndUpdate(
        playerId,
        { role },
        { new: true, runValidators: true }
    ).populate("teamId", "name")

    if (!player || player.length === 0) throw ApiError.notFound("Player not found")
    
    return player
}


export {
    createPlayer,
    getPlayerById,
    getAllPlayers,
    updatePlayer,
    deletePlayer,
    transferTeam,
    getPlayersByTeam,
    updatePlayerRole,
}
