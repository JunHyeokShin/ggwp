import PlayerProfile from '@/components/PlayerProfile'
import PlayerUpdateButton from '@/components/PlayerUpdateButton'
import {
  updatePlayerInfoDatabase,
  updatePlayerMatchesDatabase,
  updatePlayerLeagueDatabase,
} from '@/libs/database'
import { fetchPuuidFromGameNameAndTagLine } from '@/libs/utils'

export default async function PlayerPage({ params: { gameNameAndTagLine } }) {
  const gameName = decodeURI(gameNameAndTagLine.split('-')[0])
  const tagLine = decodeURI(gameNameAndTagLine.split('-')[1])
  const puuid = await fetchPuuidFromGameNameAndTagLine(gameName, tagLine)
  if (!puuid) {
    return <div>해당 플레이어를 찾을 수 없습니다.</div>
  } else {
    await updatePlayerInfoDatabase(puuid, gameName, tagLine)
    await updatePlayerLeagueDatabase(puuid)
    return (
      <div>
        <PlayerUpdateButton puuid={puuid} />
        <PlayerProfile puuid={puuid} />
        {await updatePlayerMatchesDatabase(puuid, 10)}
      </div>
    )
  }
}
