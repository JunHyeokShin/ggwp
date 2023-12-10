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
  const response = await fetch(url, { cache: 'no-store' })
  const fetchedData = await response.json()
  return fetchedData
}

export function getQueueType(queueId) {
  switch (queueId) {
    case 400:
    case 430:
      return '일반'
    case 420:
      return '솔로 랭크'
    case 440:
      return '자유 랭크'
    case 450:
      return '무작위 총력전'
    case 490:
      return '빠른 대전'
    case 700:
      return '격전'
    case 800:
    case 810:
    case 820:
    case 830:
    case 840:
    case 850:
      return 'AI'
    case 900:
      return 'URF'
    case 1020:
      return '단일'
    case 1300:
      return '돌격! 넥서스'
    case 1400:
      return '궁극의 주문서'
    case 2000:
    case 2010:
    case 2020:
      return '튜토리얼'
  }
}

export function getSummonerSpellName(summonerSpellId) {
  switch (summonerSpellId) {
    case 1:
      return 'SummonerBoost'
    case 3:
      return 'SummonerExhaust'
    case 4:
      return 'SummonerFlash'
    case 6:
      return 'SummonerHaste'
    case 7:
      return 'SummonerHeal'
    case 11:
      return 'SummonerSmite'
    case 12:
      return 'SummonerTeleport'
    case 13:
      return 'SummonerMana'
    case 14:
      return 'SummonerDot'
    case 21:
      return 'SummonerBarrier'
    case 30:
      return 'SummonerPoroRecall'
    case 31:
      return 'SummonerPoroThrow'
    case 32:
      return 'SummonerSnowball'
    case 39:
      return 'SummonerSnowURFSnowball_Mark'
  }
}

export function getUntilTime(timestamp) {
  const now = new Date()
  const miniute = Math.floor((now - timestamp) / 1000 / 60)

  if (miniute < 1) {
    return '방금 전'
  }
  if (miniute < 60) {
    return `${miniute}분 전`
  }

  const hour = Math.floor(miniute / 60)
  if (hour < 24) {
    return `${hour}시간 전`
  }
  const day = Math.floor(hour / 24)
  if (day < 365) {
    return `${day}일 전`
  }

  const year = Math.floor(day / 365)
  return `${year}년 전`
}
