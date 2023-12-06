import Image from 'next/image'

export default function PlayerLeagueFlex({ player }) {
  return (
    <div
      className="rounded-lg shadow-md bg-surface-container-light dark:bg-surface-container-dark
      text-on-surface-light dark:text-on-surface-dark"
    >
      <h1
        className="text-center text-lg font-bold p-2 rounded-t-lg
        bg-secondary-container-light dark:bg-secondary-container-dark"
      >
        자유 랭크
      </h1>
      {player.league[1] === null ? (
        <div className="grid grid-cols-4 text-center items-center px-4 p-2">
          <Image
            src="/images/emblems/UNRANKED.png"
            width={100}
            height={100}
            alt="UNRANKED"
            className="mx-auto"
          />
          <p
            className="col-span-2 text-on-surface-light dark:text-on-surface-dark
            text-opacity-40 dark:text-opacity-40"
          >
            Unranked
          </p>
          <div></div>
        </div>
      ) : (
        <div className="grid grid-cols-4 text-center items-center px-4 p-2">
          <Image
            src={`/images/emblems/${player.league[1].tier}.png`}
            width={100}
            height={100}
            className="mx-auto"
            alt={`${player.league[1].tier}`}
          />
          <div className="flex flex-col col-span-2">
            <p className="font-bold text-xl">
              {player.league[1].tier} {player.league[1].rank}
            </p>
            <p className="text-sm">{player.league[1].leaguePoints} LP</p>
          </div>
          <div className="text-sm text-on-surface-variant-light dark:text-on-surface-variant-dark">
            <p>
              {player.league[1].wins}승 {player.league[1].losses}패
            </p>
            <p>
              승률:{' '}
              {(
                (player.league[1].wins /
                  (player.league[1].wins + player.league[1].losses)) *
                100
              ).toFixed(0)}
              %
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
