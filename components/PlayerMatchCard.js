import { getMatchDatabase } from '@/libs/database'
import { getQueueType, getSummonerSpellName, getUntilTime } from '@/libs/utils'
import Image from 'next/image'
import Link from 'next/link'

export default async function PlayerMatchCard({ player, matchId }) {
  const match = await getMatchDatabase(matchId)

  if (match === null) {
    return <p>해당 매치를 찾을 수 없습니다.</p>
  } else {
    const playerIndex = match.metadata.participants.indexOf(player.puuid)
    const playerTeam =
      playerIndex < 5 ? match.info.teams[0] : match.info.teams[1]
    const playerInfo = match.info.participants[playerIndex]
    const queueType = getQueueType(match.info.queueId)
    const playerSpell1 = getSummonerSpellName(playerInfo.summoner1Id)
    const playerSpell2 = getSummonerSpellName(playerInfo.summoner2Id)

    return (
      <div
        className={
          'flex border-l-8 justify-between rounded-lg shadow-md bg-surface-container-light dark:bg-surface-container-dark text-on-surface-light dark:text-on-surface-dark ' +
          (playerInfo.win
            ? 'border-blue-400 dark:border-blue-800'
            : 'border-red-400 dark:border-red-800')
        }
      >
        <div className="flex">
          <div className="flex flex-col min-w-[120px] p-3 justify-between">
            <div className="flex flex-col">
              <div
                className={
                  'font-bold ' +
                  (playerInfo.win
                    ? 'text-blue-800 dark:text-blue-400'
                    : 'text-red-800 dark:text-red-400')
                }
              >
                {queueType}
              </div>
              <p>
                {Math.floor(match.info.gameDuration / 60)}:
                {(match.info.gameDuration % 60).toString().padStart(2, '0')}
              </p>
            </div>
            <div className="text-on-surface-variant-light dark:text-on-surface-variant-dark font-thin">
              {getUntilTime(match.info.gameEndTimestamp)}
            </div>
          </div>
          <div className="flex flex-col p-3 justify-between">
            <div className="grid grid-rows-2 grid-cols-7 gap-1">
              <div className="col-span-2 row-span-2">
                <Image
                  src={`https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/${playerInfo.championName}.png`}
                  width={80}
                  height={80}
                  alt={playerInfo.championName}
                  className="rounded-lg"
                />
                <div className="-mt-5 text-right leading-3">
                  <p className="inline-block text-sm px-1 rounded-tl-md rounded-br-lg text-on-surface-dark bg-surface-container-lowest-dark bg-opacity-60">
                    {playerInfo.champLevel}
                  </p>
                </div>
              </div>

              <Image
                src={`https://ddragon.leagueoflegends.com/cdn/13.24.1/img/spell/${playerSpell1}.png`}
                width={38}
                height={38}
                alt={playerSpell1}
                className="rounded-lg"
              />
              <div className="flex w-full h-full rounded-full bg-black">
                <Image
                  src={`/images/perks/${playerInfo.perks.styles[0].selections[0].perk}.png`}
                  width={32}
                  height={32}
                  alt={playerInfo.perks.styles[0].selections[0].perk}
                  className="m-auto"
                />
              </div>
              <div className="col-span-3 row-span-2 flex flex-col items-center justify-center">
                <p className="text-xl">
                  <span className="text-blue-700 dark:text-blue-500">
                    {playerInfo.kills}
                  </span>{' '}
                  / <span className="text-error-50">{playerInfo.deaths}</span> /{' '}
                  <span>{playerInfo.assists}</span>
                </p>
                <p className="text-sm dark:bg-tertiary-container-dark px-2 rounded-full">
                  {playerInfo.largestMultiKill === 5
                    ? '펜타킬'
                    : playerInfo.largestMultiKill === 4
                    ? '쿼드라킬'
                    : playerInfo.largestMultiKill === 3
                    ? '트리플킬'
                    : playerInfo.largestMultiKill === 2
                    ? '더블킬'
                    : ''}
                </p>
                <p className="text-sm text-on-surface-variant-light dark:text-on-surface-variant-dark">
                  {playerInfo.deaths === 0 ? (
                    playerInfo.kills === 0 ? (
                      '0.00'
                    ) : (
                      <span className="text-tertiary-light dark:text-tertiary-dark">
                        Perfect
                      </span>
                    )
                  ) : (
                    (
                      (playerInfo.kills + playerInfo.assists) /
                      playerInfo.deaths
                    ).toFixed(2)
                  )}{' '}
                  평점
                </p>
              </div>
              <Image
                src={`https://ddragon.leagueoflegends.com/cdn/13.24.1/img/spell/${playerSpell2}.png`}
                width={38}
                height={38}
                alt={playerSpell1}
                className="rounded-lg"
              />
              <div className="flex w-full h-full rounded-full bg-black">
                <Image
                  src={`/images/perks/${playerInfo.perks.styles[1].style}.png`}
                  width={24}
                  height={24}
                  alt={playerInfo.perks.styles[1].style}
                  className="m-auto"
                />
              </div>
            </div>
            <div className="grid grid-cols-7 gap-1 mt-1">
              {playerInfo.item0 === 0 ? (
                <div className="bg-neutral-40 bg-opacity-10 w-[38px] h-[38px] rounded-lg"></div>
              ) : (
                <Image
                  src={`https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/${playerInfo.item0}.png`}
                  width={38}
                  height={38}
                  alt={playerInfo.item0}
                  className="rounded-lg"
                />
              )}
              {playerInfo.item1 === 0 ? (
                <div className="bg-neutral-40 bg-opacity-10 w-[38px] h-[38px] rounded-lg"></div>
              ) : (
                <Image
                  src={`https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/${playerInfo.item1}.png`}
                  width={38}
                  height={38}
                  alt={playerInfo.item1}
                  className="rounded-lg"
                />
              )}
              {playerInfo.item2 === 0 ? (
                <div className="bg-neutral-40 bg-opacity-10 w-[38px] h-[38px] rounded-lg"></div>
              ) : (
                <Image
                  src={`https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/${playerInfo.item2}.png`}
                  width={38}
                  height={38}
                  alt={playerInfo.item2}
                  className="rounded-lg"
                />
              )}
              {playerInfo.item3 === 0 ? (
                <div className="bg-neutral-40 bg-opacity-10 w-[38px] h-[38px] rounded-lg"></div>
              ) : (
                <Image
                  src={`https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/${playerInfo.item3}.png`}
                  width={38}
                  height={38}
                  alt={playerInfo.item3}
                  className="rounded-lg"
                />
              )}
              {playerInfo.item4 === 0 ? (
                <div className="bg-neutral-40 bg-opacity-10 w-[38px] h-[38px] rounded-lg"></div>
              ) : (
                <Image
                  src={`https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/${playerInfo.item4}.png`}
                  width={38}
                  height={38}
                  alt={playerInfo.item4}
                  className="rounded-lg"
                />
              )}
              {playerInfo.item5 === 0 ? (
                <div className="bg-neutral-40 bg-opacity-10 w-full h-full rounded-lg shadow-inner"></div>
              ) : (
                <Image
                  src={`https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/${playerInfo.item5}.png`}
                  width={38}
                  height={38}
                  alt={playerInfo.item5}
                  className="rounded-lg"
                />
              )}
              {playerInfo.item6 === 0 ? (
                <div className="bg-neutral-40 bg-opacity-10 w-[38px] h-[38px] rounded-full"></div>
              ) : (
                <Image
                  src={`https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/${playerInfo.item6}.png`}
                  width={38}
                  height={38}
                  alt={playerInfo.item6}
                  className="rounded-full"
                />
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col min-w-[144px] justify-center p-3 leading-snug">
          <p>
            킬 관여{' '}
            <span>
              {playerTeam.objectives.champion.kills === 0
                ? '0'
                : (
                    ((playerInfo.kills + playerInfo.assists) /
                      playerTeam.objectives.champion.kills) *
                    100
                  ).toFixed(0)}
              %
            </span>
          </p>

          <p>시야 점수: {playerInfo.visionScore}</p>
          <div className="flex items-center">
            <Image
              src={'/images/etc/ward_red.png'}
              width={16}
              height={16}
              alt="제어 와드 구매"
            />
            <p className="px-1">{playerInfo.visionWardsBoughtInGame}</p>
            <Image
              src="/images/etc/ward.png"
              width={16}
              height={16}
              alt="와드 설치"
            />
            <p className="px-1">{playerInfo.wardsPlaced}</p>
            <Image
              src="/images/etc/ward_gray.png"
              width={16}
              height={16}
              alt="와드 제거"
            />
            <p className="px-1">{playerInfo.wardsKilled}</p>
          </div>
          <div className="flex items-center">
            <Image
              src="/images/etc/gold_light.png"
              width={16}
              height={16}
              alt="gold"
            />
            <p className="px-1">{playerInfo.goldEarned.toLocaleString()}</p>
          </div>
          <div className="flex items-center">
            <Image
              src="/images/etc/cs_light.png"
              width={16}
              height={16}
              alt="cs"
            />
            <p className="px-1">
              {playerInfo.totalMinionsKilled + playerInfo.neutralMinionsKilled}{' '}
              &#40;
              {(
                ((playerInfo.totalMinionsKilled +
                  playerInfo.neutralMinionsKilled) *
                  60) /
                match.info.gameDuration
              ).toFixed(1)}
              &#41;
            </p>
          </div>
        </div>
        <div className="flex">
          <div className="flex p-3 overflow-hidden w-[400px]">
            <div className="flex flex-col justify-between w-1/2">
              <div className="flex">
                <Image
                  src={`https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/${match.info.participants[0].championName}.png`}
                  width={24}
                  height={24}
                  alt={match.info.participants[0].championName}
                />
                <Link
                  href={`/player/${match.info.participants[0].riotIdGameName}-${match.info.participants[0].riotIdTagline}`}
                  className="overflow-hidden"
                >
                  <p className="px-1 overflow-hidden overflow-ellipsis whitespace-nowrap hover:underline">
                    {match.info.participants[0].riotIdGameName === undefined
                      ? match.info.participants[0].summonerName
                      : match.info.participants[0].riotIdGameName}
                  </p>
                </Link>
              </div>
              <div className="flex">
                <Image
                  src={`https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/${match.info.participants[1].championName}.png`}
                  width={24}
                  height={24}
                  alt={match.info.participants[1].championName}
                />
                <Link
                  href={`/player/${match.info.participants[1].riotIdGameName}-${match.info.participants[1].riotIdTagline}`}
                  className="overflow-hidden"
                >
                  <p className="px-1 overflow-hidden overflow-ellipsis whitespace-nowrap hover:underline">
                    {match.info.participants[1].riotIdGameName === undefined
                      ? match.info.participants[1].summonerName
                      : match.info.participants[1].riotIdGameName}
                  </p>
                </Link>
              </div>
              <div className="flex">
                <Image
                  src={`https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/${match.info.participants[2].championName}.png`}
                  width={24}
                  height={24}
                  alt={match.info.participants[2].championName}
                />
                <Link
                  href={`/player/${match.info.participants[2].riotIdGameName}-${match.info.participants[2].riotIdTagline}`}
                  className="overflow-hidden"
                >
                  <p className="px-1 overflow-hidden overflow-ellipsis whitespace-nowrap hover:underline">
                    {match.info.participants[2].riotIdGameName === undefined
                      ? match.info.participants[2].summonerName
                      : match.info.participants[2].riotIdGameName}
                  </p>
                </Link>
              </div>
              <div className="flex">
                <Image
                  src={`https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/${match.info.participants[3].championName}.png`}
                  width={24}
                  height={24}
                  alt={match.info.participants[3].championName}
                />
                <Link
                  href={`/player/${match.info.participants[3].riotIdGameName}-${match.info.participants[3].riotIdTagline}`}
                  className="overflow-hidden"
                >
                  <p className="px-1 overflow-hidden overflow-ellipsis whitespace-nowrap hover:underline">
                    {match.info.participants[3].riotIdGameName === undefined
                      ? match.info.participants[3].summonerName
                      : match.info.participants[3].riotIdGameName}
                  </p>
                </Link>
              </div>
              <div className="flex">
                <Image
                  src={`https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/${match.info.participants[4].championName}.png`}
                  width={24}
                  height={24}
                  alt={match.info.participants[4].championName}
                />
                <Link
                  href={`/player/${match.info.participants[4].riotIdGameName}-${match.info.participants[4].riotIdTagline}`}
                  className="overflow-hidden"
                >
                  <p className="px-1 overflow-hidden overflow-ellipsis whitespace-nowrap hover:underline">
                    {match.info.participants[4].riotIdGameName === undefined
                      ? match.info.participants[4].summonerName
                      : match.info.participants[4].riotIdGameName}
                  </p>
                </Link>
              </div>
            </div>
            <div className="flex flex-col justify-between w-1/2">
              <div className="flex">
                <Image
                  src={`https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/${match.info.participants[5].championName}.png`}
                  width={24}
                  height={24}
                  alt={match.info.participants[5].championName}
                />
                <Link
                  href={`/player/${match.info.participants[5].riotIdGameName}-${match.info.participants[5].riotIdTagline}`}
                  className="overflow-hidden"
                >
                  <p className="px-1 overflow-hidden overflow-ellipsis whitespace-nowrap hover:underline">
                    {match.info.participants[5].riotIdGameName === undefined
                      ? match.info.participants[5].summonerName
                      : match.info.participants[5].riotIdGameName}
                  </p>
                </Link>
              </div>
              <div className="flex">
                <Image
                  src={`https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/${match.info.participants[6].championName}.png`}
                  width={24}
                  height={24}
                  alt={match.info.participants[6].championName}
                />
                <Link
                  href={`/player/${match.info.participants[6].riotIdGameName}-${match.info.participants[6].riotIdTagline}`}
                  className="overflow-hidden"
                >
                  <p className="px-1 overflow-hidden overflow-ellipsis whitespace-nowrap hover:underline">
                    {match.info.participants[6].riotIdGameName === undefined
                      ? match.info.participants[6].summonerName
                      : match.info.participants[6].riotIdGameName}
                  </p>
                </Link>
              </div>
              <div className="flex">
                <Image
                  src={`https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/${match.info.participants[7].championName}.png`}
                  width={24}
                  height={24}
                  alt={match.info.participants[7].championName}
                />
                <Link
                  href={`/player/${match.info.participants[7].riotIdGameName}-${match.info.participants[7].riotIdTagline}`}
                  className="overflow-hidden"
                >
                  <p className="px-1 overflow-hidden overflow-ellipsis whitespace-nowrap hover:underline">
                    {match.info.participants[7].riotIdGameName === undefined
                      ? match.info.participants[7].summonerName
                      : match.info.participants[7].riotIdGameName}
                  </p>
                </Link>
              </div>
              <div className="flex">
                <Image
                  src={`https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/${match.info.participants[8].championName}.png`}
                  width={24}
                  height={24}
                  alt={match.info.participants[8].championName}
                />
                <Link
                  href={`/player/${match.info.participants[8].riotIdGameName}-${match.info.participants[8].riotIdTagline}`}
                  className="overflow-hidden"
                >
                  <p className="px-1 overflow-hidden overflow-ellipsis whitespace-nowrap hover:underline">
                    {match.info.participants[8].riotIdGameName === undefined
                      ? match.info.participants[8].summonerName
                      : match.info.participants[8].riotIdGameName}
                  </p>
                </Link>
              </div>
              <div className="flex">
                <Image
                  src={`https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/${match.info.participants[9].championName}.png`}
                  width={24}
                  height={24}
                  alt={match.info.participants[9].championName}
                />
                <Link
                  href={`/player/${match.info.participants[9].riotIdGameName}-${match.info.participants[9].riotIdTagline}`}
                  className="overflow-hidden"
                >
                  <p className="px-1 overflow-hidden overflow-ellipsis whitespace-nowrap hover:underline">
                    {match.info.participants[9].riotIdGameName === undefined
                      ? match.info.participants[9].summonerName
                      : match.info.participants[9].riotIdGameName}
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
