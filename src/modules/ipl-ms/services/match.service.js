import ApiError from "../../../common/utils/api-error.js";
import Match from "../models/match.model.js";
import Team from "../models/team.model.js"


const scheduleMatch = async (teamAId, teamBId, date, venue, status = 'scheduled') => {

    if (teamAId === teamBId) {
        throw ApiError.badRequest(
            "A team cannot play against itself"
        )
    }

    const teamA = await Team.findById(teamAId)
    if (!teamA) {
        throw ApiError.notFound("Team A not found")
    }

    const teamB = await Team.findById(teamBId)
    if (!teamB) {
        throw ApiError.notFound("Team B not found")
    }

    const startOfDay = new Date(date)
    startOfDay.setHours(0, 0, 0, 0)

    const endOfDay = new Date(date)
    endOfDay.setHours(23, 59, 59, 999)


    const existingMatch = await Match.findOne({ 
        date: {
            $gte: startOfDay,
            $lte: endOfDay
        }
    })

    if (existingMatch) {
        throw ApiError.conflict(
            "One of the teams already has a match scheduled on this date"
        )
    }
    
    const match = await Match.create({
        teamA: teamAId,
        teamB: teamBId,
        date,
        venue: venue.trim(),
        status
    })

    return match
}

const getMatches = async () => {
    return await Match.find()
        .select("teamA teamB date venue status")
        .populate("teamA", "name")
        .populate("teamB", "name")
        .sort({ date: 1 })
}

const getMatchById = async (matchId) => {
    const match = await Match.findById(matchId)
    if (!match) {
        throw ApiError.notFound("Match not found")
    }
    return match
}

const updateMatch = async (matchId, { date, venue, status }) => {
    const match = await Match.findById(matchId)

    if (!match) {
        throw ApiError.notFound("Match not found")
    }
    
    if (
        date === undefined &&
        venue === undefined &&
        status === undefined
    ) {
        throw ApiError.badRequest("No fields provided for update")
    }

    if (date !== undefined) match.date = date

    if (typeof venue === "string") {
        match.venue = venue.trim()
    }

    if (status !== undefined) match.status = status

    await match.save({ validateModifiedOnly: true })

    return match
}

const deleteMatch = async (matchId) => {
    const match = await Match.findByIdAndDelete(matchId) 
    if (!match) {
        throw ApiError.notFound("Match not found")
    }
    return null
} 

const getMatchByTeam = async (teamId) => {
    const matches = await Match.find ({
        $or: [
            { teamA: teamId },
            { teamB: teamId }
        ]
    })
        .populate("teamA", "name")
        .populate("teamB", "name")
        .sort({ date: 1 })

    return matches
}

const getUpcomingMatches = async () => {
    return await Match.find({
        status: "scheduled"
    })
        .populate("teamA", "name")
        .populate("teamB", "name")
        .sort({ date: 1 })
}

const updateMatchStatus = async (matchId, status) => {
    const match = await Match.findById(matchId)

    if (!match) {
        throw ApiError.notFound("Match not found")
    }

    if (typeof status !== "string") {
        throw ApiError.badRequest("Status must be a string")
    }

    match.status = status.trim()
    await match.save({ validateModifiedOnly: true })

    return match
}


export {
    scheduleMatch,
    getMatches,
    getMatchById,
    updateMatch,
    deleteMatch,
    getMatchByTeam,
    getUpcomingMatches,
    updateMatchStatus
}