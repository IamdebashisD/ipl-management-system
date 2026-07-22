import ApiError from "../../../common/utils/api-error.js";
import ApiResponse from "../../../common/utils/api-response.js";
import * as matchService from "../services/match.service.js"



const scheduleMatch = async (req, res) => {
    const { teamAId, teamBId, date, venue, status } = req.body

    if (!teamAId || !teamBId || !date || !venue || !status) {
        throw ApiError.badRequest(
            "teamAId, teamBId, date and venue are required"
        )
    }

    const match = await matchService.scheduleMatch(teamAId, teamBId, date, venue, status)

    ApiResponse.created(
        res,
        "Match scheduled successfully",
        match
    )
}

const getMatches = async (req, res) => {
    const matches = await matchService.getMatches()
    ApiResponse.ok(
        res,
        "Matches fetched successfully",
        matches
    )
}

const getMatchById = async (req, res) => {
    const { matchId } = req.params

    const match = await matchService.getMatchById(matchId)
    
    ApiResponse.ok(
        res,
        "Match fetched successfully",
        match
    )
}

const updateMatch = async (req, res) => {
    const { matchId } = req.params

    const match = await matchService.updateMatch(matchId, req.body)
    
    ApiResponse.ok(
        res,
        "Match updated successfully",
        match
    )
}

const deleteMatch = async (req, res) => {
    const { matchId } = req.params
    
    await matchService.deleteMatch(matchId)
    ApiError.ok(
        res,
        "Match deleted successfully"
    )
}


const getMatchesByTeam = async (req, res) => {
    const { teamId } = req.params

    if (!teamId) {
        throw ApiError.badRequest("Team ID is required")
    }

    const matches = await matchService.getMatchByTeam(teamId)
    ApiResponse.ok(
        res,
        "Matches fetched successfully",
        matches
    )
}

const getUpcomingMatches = async (req, res) => {
    const matches = await matchService.getUpcomingMatches()

    ApiResponse.ok(
        res,
        "Upcoming matches fetched successfully",
        matches
    )
}

const updateMatchStatus = async (req, res) => {
    const { matchId } = req.params
    const { status } = req.body

    const match = await matchService.updateMatchStatus(matchId, status)

    ApiResponse.ok(
        res,
        "Match status updated successfully",
        match
    )
}

export {
    scheduleMatch,
    getMatches,
    getMatchById,
    updateMatch,
    deleteMatch,
    getMatchesByTeam,
    getUpcomingMatches,
    updateMatchStatus
}