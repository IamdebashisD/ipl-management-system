import ApiError from "../../../common/utils/api-error.js"
import ApiResponse from "../../../common/utils/api-response.js"
import * as sponsorService from "../services/sponsor.service.js"


const createSponsor = async (req, res) => {
    if (!req.body || Object.keys(req.body).length === 0) throw ApiError.badRequest("Sponsor data is required")

    const sponsor = await sponsorService.createSponsor(req.body)
    ApiResponse.created(res, "Sponsor created successfully", sponsor)
}

const getAllSponsors = async (req, res) => {
    const sponsors = await sponsorService.getAllSponsors()
    ApiResponse.ok(res, "Sponsors fetched successfully", sponsors)
}

const getSponsorById = async (req, res) => {
    if (!req.params.id) throw ApiError.badRequest("Sponsor ID is required")
    
    const sponsor = await sponsorService.getSponsorById(req.params.id)
    
    ApiResponse.ok(res, "Sponsor fetched successfully", sponsor)
}

const updateSponsor = async (req, res) => {
    if (!req.params.id) throw ApiError.badRequest("Sponsor ID is required")
    if (!req.body || Object.keys(req.body).length === 0) throw ApiError.badRequest("Sponsor data is required")

    const sponsor = await sponsorService.updateSponsor(req.params.id, req.body)
    ApiResponse.ok(res, "Sponsor updated successfully", sponsor)
}

const deleteSponsor = async (req, res) => {
    if (!req.params.id) throw ApiError.badRequest("Sponsor ID is required")
    await sponsorService.deleteSponsor(req.params.id)

    ApiResponse.ok(res, "Sponsor deleted successfully")
}

const getSponsorByName = async (req, res) => {
    if (!req.params.name) throw ApiError.badRequest("Sponsor name is required")
    
    const sponsor = await sponsorService.getSponsorByName(req.params.name)
    ApiResponse.ok(res, "Sponsor fetched successfully", sponsor)
}

const searchSponsors = async (req, res) => {
    const { name } = req.query
    if (!name) throw ApiError.badRequest("Search query is required")
    const sponsors = await sponsorService.searchSponsors(name)
    ApiResponse.ok(res, "Sponsors fetched successfully", sponsors)
}

export {
    createSponsor,
    getAllSponsors,
    getSponsorById,
    updateSponsor,
    deleteSponsor,
    getSponsorByName,
    searchSponsors,
}