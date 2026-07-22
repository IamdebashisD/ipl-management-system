import mongoose from "mongoose";

const playerStatsSchema = new mongoose.Schema(
    {
        playerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Player",
            required: true,
            unique: true
        },
        matchesPlayed: {
            type: Number,
            default: 0,
            min: 0
        },
        runs: {
            type: Number,
            default: 0,
            min: 0,
        },
        wickets: {
            type: Number,
            default: 0,
            min: 0
        },
        catches: {
            type: Number,
            default: 0,
            min: 0
        }
    },
    { timestamps: true }
)

export default mongoose.model("PlayerStats", playerStatsSchema)