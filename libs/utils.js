export async function fetchPuuidFromGameNameAndTagLine(gameName, tagLine) {
  const url = `https://asia.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}?api_key=${process.env.API_KEY}`
  const response = await fetch(url, { cache: 'no-store' })
  const fetchedData = await response.json()
  return fetchedData.puuid
}
