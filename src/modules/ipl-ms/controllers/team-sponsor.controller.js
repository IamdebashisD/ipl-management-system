import ApiResponse from "../../../common/utils/api-response.js";
import ApiError from "../../../common/utils/api-error.js";
import * as teamSponsorService from "../services/team-sponsor.service.js";


const attachSponsor = async (req, res) => {
    const teamSponsor = await teamSponsorService.attachSponsor(req.body)
    ApiResponse.created(
        res,
        "Sponsor attached to team successfully",
        teamSponsor
    )
}

const detachSponsor = async (req, res) => {
    if (!req.params.id) {
        throw ApiError.badRequest("ID is required")
    }
    const teamSponsor = await teamSponsorService.detachSponsor(req.params.id)
    ApiResponse.ok(
        res,
        "Sponsor detached from team successfully",
        teamSponsor
    )
}

const getSponsorByTeam = async (req, res) => {
    if (!req.params.id) {
        throw ApiError.badRequest("Team ID is required")
    }
    const sponsors = await teamSponsorService.getSponsorByTeam(req.params.id)
    ApiResponse.ok(
        res,
        "Sponsors fetched successfully",
        sponsors
    )
}

const getTeamBySponsor = async (req, res) => {
    if (!req.params.id) {
        throw ApiError.badRequest("Sponsor ID is required")
    }
    const teams = await teamSponsorService.getTeamBySponsor(req.params.id)
    ApiResponse.ok(
        res,
        "Teams fetched successfully",
        teams
    )
}

const getAllTeamSponsors = async (req, res) => {
    const teamSponsors = await teamSponsorService.getAllTeamSponsors()
    ApiResponse.ok(
        res,
        "Team-Sponsor relations fetched successfully",
        teamSponsors
    )
}

export {
    attachSponsor,
    detachSponsor,
    getSponsorByTeam,
    getTeamBySponsor,
    getAllTeamSponsors
}

