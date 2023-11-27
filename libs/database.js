import Player from '@/models/player'
import mongoose from 'mongoose'

export default async function connectDB() {
  try {
    await mongoose.connect(process.env.DB_URI)
    console.log('Conneced to MongoDB')
  } catch (error) {
    console.log(error)
  }
}

async function fetchPlayerInfoData(puuid) {
  const accountsUrl = `https://asia.api.riotgames.com/riot/account/v1/accounts/by-puuid/${puuid}?api_key=${process.env.API_KEY}`
  const summonerUrl = `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}?api_key=${process.env.API_KEY}`
  const accountsResponse = await fetch(accountsUrl, {
    next: { revalidate: 60 },
  })
  const summonerResponse = await fetch(summonerUrl, {
    next: { revalidate: 60 },
  })
  const fetchedAccountsData = await accountsResponse.json()
  const fetchedSummonerData = await summonerResponse.json()
  console.log(Object.assign(fetchedAccountsData, fetchedSummonerData))
  return Object.assign(fetchedAccountsData, fetchedSummonerData)
}

async function fetchPlayerMatchesData(puuid, start, count) {
  const url = `https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=${start}&count=${count}&api_key=${process.env.API_KEY}`
  const response = await fetch(url, { next: { revalidate: 180 } })
  const fetchedData = await response.json()
  console.log(fetchedData)
  return fetchedData
}

export async function updatePlayerInfoDatabase(playerPuuid) {
  await connectDB()
  if (await Player.findOne({ puuid: playerPuuid })) {
    const {
      gameName,
      tagLine,
      name,
      profileIconId,
      revisionDate,
      summonerLevel,
    } = await fetchPlayerInfoData(playerPuuid)
    await Player.updateOne(
      { puuid: playerPuuid },
      {
        gameName,
        tagLine,
        name,
        profileIconId,
        revisionDate,
        summonerLevel,
      }
    )
    console.log('플레이어DB 업데이트 완료')
  } else {
    const {
      puuid,
      gameName,
      tagLine,
      id,
      accountId,
      name,
      profileIconId,
      revisionDate,
      summonerLevel,
    } = await fetchPlayerInfoData(playerPuuid)
    await Player.create({
      puuid,
      gameName,
      tagLine,
      id,
      accountId,
      name,
      profileIconId,
      revisionDate,
      summonerLevel,
    })
    console.log('플레이어DB 생성 완료')
  }
}

export async function updatePlayerMatchesDatabase(playerPuuid) {
  await connectDB()
  const matches = await fetchPlayerMatchesData(playerPuuid, 0, 20)
  console.log(matches)
  await Player.findOneAndUpdate(
    { puuid: playerPuuid },
    {
      $addToSet: {
        matches: {
          $each: matches,
        },
      },
    }
  )
  await Player.findOneAndUpdate(
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
  console.log('플레이어 매치 DB 업데이트 완료')
}
