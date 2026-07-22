import mongoose from "mongoose"

const matchSchema = new mongoose.Schema({
    teamA: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
        required: true
    },
    teamB: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
        required: true,
        validate: {
            validator: function (value) {
                return value.toString() !== this.teamA.toString()
            },
            message: "A team cannot play against itself"
        }
    },
    date: {
        type: Date,
        required: true
    },
    venue: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 100
    },
    status: {
        type: String,
        enum: ["scheduled", "ongoing", "completed"],
        default: "scheduled"
    }
}, { timestamps: true })

matchSchema.index({ date: 1 })

export default mongoose.model("Match", matchSchema)
