import Match from '@/models/match'
import Player from '@/models/player'
import mongoose from 'mongoose'
import {
  fetchPlayerInfoData,
  fetchPlayerLeagueData,
  fetchPlayerMatchesData,
  fetchMatchData,
} from './utils'

export default async function connectDB() {
  try {
    await mongoose.connect(process.env.DB_URI)
  } catch (error) {
    console.log(error)
  }
}

export async function updatePlayerInfoDatabase(
  playerPuuid,
  playerGameName,
  playerTagLine
) {
  await connectDB()
  if (await Player.findOne({ puuid: playerPuuid })) {
    const { name, profileIconId, revisionDate, summonerLevel } =
      await fetchPlayerInfoData(playerPuuid)
    await Player.updateOne(
      { puuid: playerPuuid },
      {
        gameName: playerGameName,
        tagLine: playerTagLine,
        name,
        profileIconId,
        revisionDate,
        summonerLevel,
      }
    )
  } else {
    const { id, accountId, name, profileIconId, revisionDate, summonerLevel } =
      await fetchPlayerInfoData(playerPuuid)
    await Player.create({
      puuid: playerPuuid,
      gameName: playerGameName,
      tagLine: playerTagLine,
      id,
      accountId,
      name,
      profileIconId,
      revisionDate,
      summonerLevel,
    })
  }
}

export async function updatePlayerLeagueDatabase(playerPuuid) {
  await connectDB()
  const { id } = await Player.findOne({ puuid: playerPuuid })
  const leagueData = await fetchPlayerLeagueData(id)
  await Player.updateOne({ puuid: playerPuuid }, { league: [] })

  if (leagueData.length === 0) {
    for (let i = 0; i < 2; i++) {
      await Player.updateOne(
        { puuid: playerPuuid },
        {
          $push: {
            league: [null],
          },
        }
      )
    }
  } else if (leagueData.length === 1) {
    if (leagueData[0].queueType === 'RANKED_SOLO_5x5') {
      await Player.updateOne(
        { puuid: playerPuuid },
        {
          $addToSet: {
            league: {
              leagueId: leagueData[0].leagueId,
              queueType: leagueData[0].queueType,
              tier: leagueData[0].tier,
              rank: leagueData[0].rank,
              leaguePoints: leagueData[0].leaguePoints,
              wins: leagueData[0].wins,
              losses: leagueData[0].losses,
              veteran: leagueData[0].veteran,
              inactive: leagueData[0].inactive,
              freshBlood: leagueData[0].freshBlood,
              hotStreak: leagueData[0].hotStreak,
            },
          },
        }
      )
      await Player.updateOne(
        { puuid: playerPuuid },
        {
          $addToSet: {
            league: [null],
          },
        }
      )
    } else if (leagueData[0].queueType === 'RANKED_FLEX_SR') {
      await Player.updateOne(
        { puuid: playerPuuid },
        {
          $addToSet: {
            league: [null],
          },
        }
      )
      await Player.updateOne(
        { puuid: playerPuuid },
        {
          $push: {
            league: {
              leagueId: leagueData[0].leagueId,
              queueType: leagueData[0].queueType,
              tier: leagueData[0].tier,
              rank: leagueData[0].rank,
              leaguePoints: leagueData[0].leaguePoints,
              wins: leagueData[0].wins,
              losses: leagueData[0].losses,
              veteran: leagueData[0].veteran,
              inactive: leagueData[0].inactive,
              freshBlood: leagueData[0].freshBlood,
              hotStreak: leagueData[0].hotStreak,
            },
          },
        }
      )
    }
  } else {
    if (leagueData[0].queueType === 'RANKED_SOLO_5x5') {
      for (let i = 0; i < leagueData.length; i++) {
        await Player.updateOne(
          { puuid: playerPuuid },
          {
            $addToSet: {
              league: {
                leagueId: leagueData[i].leagueId,
                queueType: leagueData[i].queueType,
                tier: leagueData[i].tier,
                rank: leagueData[i].rank,
                leaguePoints: leagueData[i].leaguePoints,
                wins: leagueData[i].wins,
                losses: leagueData[i].losses,
                veteran: leagueData[i].veteran,
                inactive: leagueData[i].inactive,
                freshBlood: leagueData[i].freshBlood,
                hotStreak: leagueData[i].hotStreak,
              },
            },
          }
        )
      }
    } else {
      for (let i = 1; i >= 0; i--) {
        await Player.updateOne(
          { puuid: playerPuuid },
          {
            $addToSet: {
              league: {
                leagueId: leagueData[i].leagueId,
                queueType: leagueData[i].queueType,
                tier: leagueData[i].tier,
                rank: leagueData[i].rank,
                leaguePoints: leagueData[i].leaguePoints,
                wins: leagueData[i].wins,
                losses: leagueData[i].losses,
                veteran: leagueData[i].veteran,
                inactive: leagueData[i].inactive,
                freshBlood: leagueData[i].freshBlood,
                hotStreak: leagueData[i].hotStreak,
              },
            },
          }
        )
      }
    }
  }
}

export async function updatePlayerMatchesDatabase(playerPuuid, count) {
  await connectDB()
  const matches = await fetchPlayerMatchesData(playerPuuid, 0, count)
  await Player.updateOne(
    { puuid: playerPuuid },
    {
      $addToSet: {
        matches: {
          $each: matches,
        },
      },
    }
  )
  await Player.updateOne(
    { puuid: playerPuuid },
    {
      $push: {
        matches: {
          $each: [],
          $sort: -1,
        },
      },
    }
  )
  for (let i = 0; i < matches.length; i++) {
    await updateMatchDatabase(matches[i])
  }
}

export async function updateMatchDatabase(matchId) {
  await connectDB()
  if ((await Match.findOne({ 'metadata.matchId': matchId })) === null) {
    const match = await fetchMatchData(matchId)
    await Match.create(match)
  }
}

export async function getPlayerDatabase(playerPuuid) {
  await connectDB()
  const player = await Player.findOne({ puuid: playerPuuid })
  return player
}

export async function getMatchDatabase(matchId) {
  await connectDB()
  const match = await Match.findOne({ 'metadata.matchId': matchId })
  return match
}
