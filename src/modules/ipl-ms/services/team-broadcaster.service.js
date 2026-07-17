import ApiError from "../../../common/utils/api-error.js"
import Team from "../models/team.model.js"
import Broadcaster from "../models/broadcaster.model.js"
import TeamBroadcaster from "../models/team-broadcaster.model.js"


const assignBroadcaster = async ({ teamId, broadcasterId }) => {
    const team = await Team.findById(teamId)
    if (!team) {
        throw ApiError.notFound("Team not found")
    }

    const broadcaster = await Broadcaster.findById(broadcasterId)
    if (!broadcaster) {
        throw ApiError.notFound("Broadcaster not found")
    }

    const existing = await TeamBroadcaster.findOne({ teamId, broadcasterId })
    if (existing) {
        throw ApiError.conflict("Broadcaster already assigned to this team")
    }
    
    const teamBroadcaster = await TeamBroadcaster.create({ teamId , broadcasterId })
    return teamBroadcaster
}

const updateBroadcaster = async (id, { teamId, broadcasterId }) => {
    const relation = await TeamBroadcaster.findById(id)
    if (!relation) {
        throw ApiError.notFound("Team-Broadcaster relation not found")
    }

    if (teamId) {
        const team = await Team.findById(teamId)
        if (!team) {
            throw ApiError.notFound("Team not found")
        }
    }

    if (broadcasterId) {
        const broadcaster = await Broadcaster.findById(broadcasterId)
        if (!broadcaster) {
            throw ApiError.notFound("Broadcaster not found")
        }
    }

    const updatedRelation = await TeamBroadcaster.findByIdAndUpdate(id, { teamId, broadcasterId }, { new: true })
    return updatedRelation
}

const getBroadcasterByTeam = async (teamId) => {
    const team = await Team.findById(teamId) 
    if (!team) {
        throw ApiError.notFound("Team not found")
    }

    const broadcasters = await TeamBroadcaster
        .find({ teamId })
        .populate("broadcasterId", "name")

    return broadcasters.map(tb => tb.broadcasterId)
}

const getTeamByBroadcaster = async (broadcasterId) => {
    const broadcaster = await Broadcaster.findById(broadcasterId)
    if (!broadcaster) {
        throw ApiError.notFound("Broadcaster not found")
    }

    const teams = await TeamBroadcaster.find({ broadcasterId }).populate("teamId", "name")
    return teams.map(tb => tb.teamId)
}

const removeBroadcaster = async (teamId, broadcasterId) => {
    const team = await Team.findById(teamId)
    if (!team) throw ApiError.notFound("Team not found")
        
    const broadcaster = await Broadcaster.findById(broadcasterId)
    if (!broadcaster) throw ApiError.notFound("Broadcaster not found")

    const relation = await TeamBroadcaster.findOneAndDelete({ teamId, broadcasterId })
    if (!relation) throw ApiError.notFound("Broadcaster is not assigned to this team")

    return null
}

const getAllTeamBroadcaster = async () => {
    const relations = await TeamBroadcaster.find()
    
    if (!relations.length) {
        throw ApiError.notFound("No team-broadcaster relations found")
    }

    return relations
}

export {
    assignBroadcaster,
    getBroadcasterByTeam,
    getTeamByBroadcaster,
    removeBroadcaster,
    updateBroadcaster,
    getAllTeamBroadcaster
}