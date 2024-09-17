import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    }
  },
  { timestamps: true }
)

export default mongoose.model("Movie", movieSchema)

// export const Movie = mongoose.model('Movie', movieSchema);