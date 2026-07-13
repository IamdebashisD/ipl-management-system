import ApiError from "../../../common/utils/api-error.js";
import Team from "../models/team.model.js";
import Sponsor from "../models/sponsor.model.js"
import TeamSponsor from "../models/team-sponsor.model.js"


const attachSponsor = async({ teamId, sponsorId }) => {
    const team = await Team.findById(teamId)
    if (!team) throw ApiError.notFound("Team not found")

    const sponsor = await Sponsor.findById(sponsorId)
    if (!sponsor) throw ApiError.notFound("Sponsor not found")

    const existing = await TeamSponsor.findOne({ teamId, sponsorId })
    if (existing || existing.length === 0) {
        throw ApiError.conflict("Sponsor already attached to this team")
    }

    const teamSponsor = await TeamSponsor.create({ teamId, sponsorId })
    return teamSponsor
}

const detachSponsor = async (id) => {
    const teamSponsor = await TeamSponsor.findByIdAndDelete(id)
    if (!teamSponsor) {
        throw ApiError.notFound("Team-Sponsor relation not found")
    }

    return teamSponsor
}

const getSponsorByTeam = async (teamId) => {
    const team = await Team.findById(teamId)
    if (!team) throw ApiError.notFound("Team not found")

    const sponsors = await TeamSponsor
        .find({ teamId })
        .populate("sponsorId", "name")

    return sponsors
}

const getTeamBySponsor = async (sponsorId) => {

    const sponsor = await Sponsor.findById(sponsorId)
    if (!sponsor) throw ApiError.notFound("Sponsor not found")

    const teams = await TeamSponsor
        .find({ sponsorId })
        .populate("teamId", "name")
    
    return teams
}

const getAllTeamSponsors = async () => {

    const teamSponsors = await TeamSponsor
        .find()
        .populate("sponsorId", "name")
        .populate("teamId", "name")

    return teamSponsors
}


export {
    attachSponsor,
    detachSponsor,
    getSponsorByTeam,
    getTeamBySponsor,
    getAllTeamSponsors
}