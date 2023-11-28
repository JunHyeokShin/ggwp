import Match from '@/models/match'
import Player from '@/models/player'
import mongoose from 'mongoose'

export default async function connectDB() {
  try {
    await mongoose.connect(process.env.DB_URI)
  } catch (error) {
    console.log(error)
  }
}

async function fetchPlayerInfoData(puuid) {
  const url = `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}?api_key=${process.env.API_KEY}`
  const response = await fetch(url, { next: { revalidate: 60 } })
  console.log('fetch info')
  const fetchedData = await response.json()
  return fetchedData
}

async function fetchPlayerLeagueData(id) {
  const url = `https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}?api_key=${process.env.API_KEY}`
  const response = await fetch(url, { next: { revalidate: 180 } })
  console.log('fetch league')
  const fetchedData = await response.json()
  return fetchedData
}

async function fetchPlayerMatchesData(puuid, start, count) {
  const url = `https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=${start}&count=${count}&api_key=${process.env.API_KEY}`
  const response = await fetch(url, { next: { revalidate: 180 } })
  console.log('fetch matches')
  const fetchedData = await response.json()
  return fetchedData
}

async function fetchMatchData(matchId) {
  const url = `https://asia.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${process.env.API_KEY}`
  const response = await fetch(url)
  console.log('fetch match')
  const fetchedData = await response.json()
  return fetchedData
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
  }
}

export async function updatePlayerMatchesDatabase(playerPuuid, count) {
  await connectDB()
  const matches = await fetchPlayerMatchesData(playerPuuid, 0, count)
  const matchesLengthBeforeUpdate = (
    await Player.findOne({ puuid: playerPuuid })
  ).matches.length
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
  const matchesLengthAfterUpdate = (
    await Player.findOne({ puuid: playerPuuid })
  ).matches.length
  const updatedMatchesLength =
    matchesLengthAfterUpdate - matchesLengthBeforeUpdate
  for (let i = 0; i < updatedMatchesLength; i++) {
    await updateMatchDatabase(matches[i])
  }
}

// export async function updatePlayerMatchesDatabase(playerPuuid) {
//   await connectDB()
//   const matches = await fetchPlayerMatchesData(playerPuuid, 0, 20)
//   await Player.updateOne(
//     { puuid: playerPuuid },
//     {
//       $addToSet: {
//         matches: {
//           $each: matches,
//         },
//       },
//     }
//   )
//   await Player.updateOne(
//     { puuid: playerPuuid },
//     {
//       $push: {
//         matches: {
//           $each: [],
//           $sort: -1,
//         },
//       },
//     }
//   )
//   for (let i = 0; i < matches.length; i++) {
//     await updateMatchDatabase(matches[i])
//   }
// }

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

export async function getPlayerPuuid(gameName, tagLine) {
  await connectDB()
  const puuid = await Player.findOne({ gameName: gameName, tagLine: tagLine })
}
