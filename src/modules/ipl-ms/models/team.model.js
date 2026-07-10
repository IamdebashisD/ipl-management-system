import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Team is required"],
    trim: true,
    unique: true,
    minlength: 2,
    maxlength: 100,
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Owner",
    required: [true, "Owner is required"]
  },
}, { timestamps: true });

export default mongoose.model("Team", teamSchema)