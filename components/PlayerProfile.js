import Image from 'next/image'
import PlayerUpdateButton from './PlayerUpdateButton'

export default function PlayerProfile({ player }) {
  const now = new Date()
  const updatedBefore = ((now - player.updatedAt) / 60000).toFixed()

  return (
    <div
      className="flex justify-between p-4 rounded-lg shadow-md
      bg-surface-container-light dark:bg-surface-container-dark
      text-on-surface-light dark:text-on-surface-dark"
    >
      <div className="flex items-center">
        <div className="-mb-2 min-w-fit">
          <Image
            src={`https://ddragon.leagueoflegends.com/cdn/13.23.1/img/profileicon/${player.profileIconId}.png`}
            width={96}
            height={96}
            className="rounded-full shadow-md"
          />
          <div className="block -mt-4 text-center">
            <p
              className="inline-block px-3 text-sm rounded-full shadow-md
              bg-surface-container-lowest-light dark:bg-surface-container-lowest-dark"
            >
              {player.summonerLevel}
            </p>
          </div>
        </div>
        <div className="flex flex-col mx-4">
          <h1 className="text-5xl font-black tracking-wide leading-none">
            {player.gameName}
            <span className="text-3xl font-bold tracking-wide leading-none">
              {' '}
              #{player.tagLine}
            </span>
          </h1>
          <p
            className="font-light tracking-wide
            text-on-surface-variant-light dark:text-on-surface-variant-dark"
          >
            &#40;prev. {player.name}&#41;
          </p>
        </div>
      </div>
      <div className="flex items-end min-w-fit">
        <div className="flex flex-col items-end">
          <p className="text-sm pb-2">최근 업데이트: {updatedBefore}분 전</p>
          <PlayerUpdateButton
            puuid={player.puuid}
            gameName={player.gameName}
            tagLine={player.tagLine}
          />
        </div>
      </div>
    </div>
  )
}
