import mongoose from 'mongoose'
const { Schema } = mongoose

const rankingSchema = new Schema({
  tier: String,
  leagueId: String,
  queue: String,
  name: String,
  entries: [
    {
      summonerId: String,
      summonerName: String,
      leaguePoints: Number,
      rank: String,
      wins: Number,
      losses: Number,
      veteran: Boolean,
      inactive: Boolean,
      freshBlood: Boolean,
      hotStreak: Boolean,
    },
  ],
})

export const Ranking =
  mongoose.models.Ranking || mongoose.model('Ranking', rankingSchema)

export default Ranking
