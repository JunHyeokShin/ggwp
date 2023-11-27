import mongoose from 'mongoose'
const { Schema } = mongoose

const playerSchema = new Schema(
  {
    puuid: String,
    gameName: String,
    tagLine: String,
    id: String,
    accountId: String,
    name: String,
    profileIconId: Number,
    revisionDate: Number,
    summonerLevel: Number,
    matches: [String],
  },
  {
    timestamps: true,
  }
)

export const Player =
  mongoose.models.Player || mongoose.model('Player', playerSchema)

export default Player
