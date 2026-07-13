import Sponsor from "../models/sponsor.model.js"
import ApiError from "../../../common/utils/api-error.js"

const createSponsor = async ({ name }) => {
    if (!name) throw ApiError.badRequest("Sponsor name is required")
    
    const existingSponsor = await Sponsor.findOne({
        name: name.trim()
    })
    if (existingSponsor) throw ApiError.conflict("Sponsor already exists")
    
    const sponsor = await Sponsor.create({ name })
    return sponsor
}

const getAllSponsors = async () => {
    const sponsors = await Sponsor.find()
    return sponsors
}

const getSponsorById = async (sponsorId) => {
    const sponsor = await Sponsor.findById(sponsorId)
    if (!sponsor) throw ApiError.notFound("Sponsor not found")
    return sponsor
}

const updateSponsor = async (id, updateData) => {
    if (updateData.name) {
        const existingSponsor = await Sponsor.findOne({
            name: updateData.name,
            _id: { $ne: id }
        })

        if (existingSponsor) throw ApiError.conflict("Sponsor name already exists")
    }

    const sponsor = await Sponsor.findByIdAndUpdate(
        id, 
        updateData, 
        { 
            new: true, 
            runValidators: true 
        }
    )
    if (!sponsor) throw ApiError.notFound("Sponsor not found")

    return sponsor
}

const deleteSponsor = async (id) => {
    const sponsor = await Sponsor.findByIdAndDelete(id)
    if (!sponsor) throw ApiError.notFound("Sponsor not found")
        
    return null
}

const getSponsorByName = async (name) => {
    const sponsor = await Sponsor.findOne({ 
        name: new RegExp(`^${name}$`, "i")
    })

    if (!sponsor) throw ApiError.notFound("Sponsor not found")

    return sponsor
}

const searchSponsors = async (query) => {
    return await Sponsor.find({
        name: { 
            $regex: query.trim(), 
            $options: "i"
        }
    })
}


export {
    createSponsor,
    getAllSponsors,
    getSponsorById,
    updateSponsor,
    deleteSponsor,
    getSponsorByName,
    searchSponsors
}

