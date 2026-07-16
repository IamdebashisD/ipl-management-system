import Broadcaster from "../models/broadcaster.model.js"
import ApiError from "../../../common/utils/api-error.js"


const createBroadcaster = async ({ name }) => {
    if (!name) throw ApiError.badRequest("Name is required")
    
    const existingBroadcaster = await Broadcaster.findOne({
        name: name.trim()
    })

    if (existingBroadcaster) throw ApiError.conflict("Broadcaster already exists")

    const broadcaster = await Broadcaster.create({ name })
    return broadcaster
}

const getAllBroadcaster = async () => {
    const broadcasters = await Broadcaster.find()
    if (!broadcasters) throw ApiError.notFound("Broadcasters not found")
    return broadcasters
}

const getBroadcasterById = async (id) => {
    const broadcaster = await Broadcaster.findById(id)
    if (!broadcaster) throw ApiError.notFound("Broadcaster not found")
    return broadcaster
}

const updateBroadcaster = async (id, broadcasterData) => {
    if (broadcasterData.name) {
        const existingBroadcaster = await Broadcaster.findOne({
            name: broadcasterData.name,
            _id: { $ne: id }
        })

        if (existingBroadcaster) throw ApiError.conflict("Broadcaster already exists")
    }

    const broadcaster = await Broadcaster.findByIdAndUpdate(
        id,
        broadcasterData,
        {
            new: true,
            runValidators: true
        }
    )
    if (!broadcaster) throw ApiError.notFound("Broadcaster not found")

    return broadcaster
}

const deleteBroadcaster = async (id) => {
    const broadcaster = await Broadcaster.findByIdAndDelete(id)
    if (broadcaster) throw ApiError.notFound("Broadcaster not found")
    
    return null
}

const getBroadcasterByName = async (name) => {
    const broadcaster = await Broadcaster.findOne({ 
        name: new RegExp(`^${name}$`, "i") 
    })
    
    if (broadcaster) throw ApiError.notFound("Broadcaster not found")
    
    return broadcaster
}

const searchBroadcasters = async (query) => {
    return await Broadcaster.find({ 
        name: { $regex: query, $options: "i" }
    })
}

export {
    createBroadcaster,
    getAllBroadcaster,
    getBroadcasterById,
    updateBroadcaster,
    deleteBroadcaster,
    getBroadcasterByName,
    searchBroadcasters
}