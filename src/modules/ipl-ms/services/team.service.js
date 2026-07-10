import ApiError from "../../../common/utils/api-error.js";
import Team from "../models/team.model.js"


const createTeam  = async (teamData) => {
    if (!teamData.name || !teamData.ownerId) {
        throw ApiError.badRequest("Name and OwnerId are required")
    }

    const existing = await Team.findOne({
        name: { $regex: new RegExp(`^${teamData.name}$`, "i") }
    })
    if (existing) {
        throw ApiError.conflict("Team already exist")
    }
    
    const team = await Team.create(teamData)
    
    return team
}

const getTeamById = async (id) => {
    const team = await Team.findById(id).populate("ownerId", "name company")
    if (!team) {
        throw ApiError.notFound("Team not found")
    }
    return team
}

const getAllTeam = async () => {
    const team = await Team.find().populate("ownerId", "company")
    if (!team) {
        throw ApiError.notFound("Team not found")
    }
    return team
}

const updateTeam = async (teamId, teamData) => {
    const team = await Team.findById(teamId)
    if (!team) {
        throw ApiError.notFound("Team not found")
    }

    const updatedTeam = await Team.findByIdAndUpdate(
        teamId, 
        teamData, 
        { new: true, runValidators: true }
    )
    return updatedTeam
}

const deleteTeam = async (teamId) => {
    const team = await Team.findByIdAndDelete(teamId)
    if (!team) {
        throw ApiError.notFound("Team not found")
    }
    return team
}

const getTeamByOwnerId = async (ownerId) => {
    const team = await Team.find({ ownerId })
    if (!team) {
        throw ApiError.notFound("Team not found")
    }
    return team
}


export { 
    createTeam, 
    getTeamById, 
    getAllTeam, 
    updateTeam, 
    deleteTeam, 
    getTeamByOwnerId 
}