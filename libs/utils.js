export async function fetchPlayerInfoData(puuid) {
  const url = `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}?api_key=${process.env.API_KEY}`
  const response = await fetch(url, { next: { revalidate: 180 } })
  console.log('fetch info')
  const fetchedData = await response.json()
  return fetchedData
}

export async function fetchPlayerLeagueData(id) {
  const url = `https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}?api_key=${process.env.API_KEY}`
  const response = await fetch(url, { next: { revalidate: 60 } })
  console.log('fetch league')
  const fetchedData = await response.json()
  return fetchedData
}

export async function fetchPlayerMatchesData(puuid, start, count) {
  const url = `https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=${start}&count=${count}&api_key=${process.env.API_KEY}`
  const response = await fetch(url, { next: { revalidate: 60 } })
  console.log('fetch matches')
  const fetchedData = await response.json()
  return fetchedData
}

export async function fetchMatchData(matchId) {
  const url = `https://asia.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${process.env.API_KEY}`
  const response = await fetch(url)
  console.log('fetch match')
  const fetchedData = await response.json()
  return fetchedData
}

export async function fetchPlayerInfoFromGameNameAndTagLine(gameName, tagLine) {
  const url = `https://asia.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}?api_key=${process.env.API_KEY}`
  const response = await fetch(url, { cache: 'no-store' })
  const fetchedData = await response.json()
  return fetchedData
}

export async function fetchRankData(queue) {
  const url = `https://kr.api.riotgames.com/lol/league/v4/challengerleagues/by-queue/${queue}?api_key=${process.env.API_KEY}`
  const response = await fetch(url)
  const fetchedData = await response.json()
  return fetchedData
}
