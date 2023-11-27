import PlayerProfile from '@/components/PlayerProfile'
import {
  updatePlayerInfoDatabase,
  updatePlayerMatchesDatabase,
} from '@/libs/database'
import { fetchPuuidFromGameNameAndTagLine } from '@/libs/utils'

export default async function PlayerPage({ params: { gameNameAndTagLine } }) {
  const puuid = await fetchPuuidFromGameNameAndTagLine(
    gameNameAndTagLine.split('-')[0],
    gameNameAndTagLine.split('-')[1]
  )
  if (!puuid) {
    return <div>해당 플레이어를 찾을 수 없습니다.</div>
  } else {
    await updatePlayerInfoDatabase(puuid, gameNameAndTagLine)
    await updatePlayerMatchesDatabase(puuid)
    return (
      <div>
        <PlayerProfile puuid={puuid} />
      </div>
    )
  }
}
