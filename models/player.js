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
    league: [
      {
        leagueId: String,
        queueType: String,
        tier: String,
        rank: String,
        leaguePoints: Number,
        wins: Number,
        losses: Number,
        veteran: Boolean,
        inactive: Boolean,
        freshBlood: Boolean,
        hotStreak: Boolean,
      },
    ],
    matches: [String],
  },
  {
    timestamps: true,
  }
)

export const Player =
  mongoose.models.Player || mongoose.model('Player', playerSchema)

export default Player
