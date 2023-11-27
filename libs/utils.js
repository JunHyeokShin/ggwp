export async function fetchPuuidFromGameNameAndTagLine(gameName, tagLine) {
  const url = `https://asia.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}?api_key=${process.env.API_KEY}`
  const response = await fetch(url)
  const fetchedData = await response.json()
  return fetchedData.puuid
}

export async function fetchIdFromPuuid(puuid) {
  const url = `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}?api_key=${process.env.API_KEY}`
  const response = await fetch(url)
  const fetchedData = await response.json()
  return fetchedData.id
}
