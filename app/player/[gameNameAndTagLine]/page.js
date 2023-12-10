import { fetchPlayerInfoFromGameNameAndTagLine } from '@/libs/utils'
import {
  updatePlayerInfoDatabase,
  updatePlayerLeagueDatabase,
  updatePlayerMatchesDatabase,
  getPlayerDatabase,
} from '@/libs/database'
import PlayerProfile from '@/components/PlayerProfile'
import PlayerLeagueSolo from '@/components/PlayerLeagueSolo'
import PlayerLeagueFlex from '@/components/PlayerLeagueFlex'
import PlayerMatchCards from '@/components/PlayerMatchCards'

export default async function PlayerPage({ params: { gameNameAndTagLine } }) {
  const playerGameName = decodeURI(gameNameAndTagLine.split('-')[0])
  const playerTagLine = decodeURI(gameNameAndTagLine.split('-')[1])

  const { puuid, gameName, tagLine } =
    await fetchPlayerInfoFromGameNameAndTagLine(playerGameName, playerTagLine)

  if (!puuid) {
    return <div>해당 플레이어를 찾을 수 없습니다.</div>
  } else {
    let player = await getPlayerDatabase(puuid)

    if (player === null) {
      await updatePlayerInfoDatabase(puuid, gameName, tagLine)
      await updatePlayerLeagueDatabase(puuid)
      await updatePlayerMatchesDatabase(puuid, 20)
      player = await getPlayerDatabase(puuid)
    }

    return (
      <div className="m-3 grid grid-cols-2 gap-3">
        <div className="grid col-span-2 xl:col-span-3">
          <PlayerProfile player={player} />
        </div>
        <div className="grid grid-cols-2 col-span-2 gap-3">
          <PlayerLeagueSolo player={player} />
          <PlayerLeagueFlex player={player} />
        </div>
        <div className="grid gap-3 col-span-2">
          <PlayerMatchCards player={player} />
        </div>
      </div>
    )
  }
}
