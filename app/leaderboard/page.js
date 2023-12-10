import React from 'react'
import { getRankDatabase, updateRankingDatabase } from '@/libs/database'

import Link from 'next/link'

export default async function LeaderboardPage() {
  await updateRankingDatabase('RANKED_SOLO_5x5')
  const soloRank = await getRankDatabase('RANKED_SOLO_5x5')
  console.log(soloRank)

  await updateRankingDatabase('RANKED_FLEX_SR')
  const flexRank = await getRankDatabase('RANKED_FLEX_SR')
  console.log(flexRank)

  const RankList = ({ entries, rankType }) => (
    <div>
      <h2 className="text-2xl font-bold p-3">{rankType}</h2>
      {entries.slice(0, 10).map((entry, index) => (
        <div
          key={index}
          className="flex flex-col md:flex-row justify-between bg-surface-container-light dark:bg-surface-container-dark rounded-lg shadow-md m-2 cursor-pointer"
        >
          <div className="flex items-center md:ml-6">
            <div className="p-3 md:p-3">
              <p className="font-bold text-lg">{index + 1}.</p>
            </div>
            <div className="p-3 md:p-3 text-lg font-semibold min-w-[160px]">
              <p>{entry.summonerName}</p>
            </div>
          </div>
          <div className="p-3 md:p-3 text-center">
            <p>Challenger {entry.rank}</p>
            <p>{entry.leaguePoints}점</p>
          </div>
          <div className="p-3 md:p-3 text-center mr-6">
            <p>
              {entry.wins}승/{entry.losses}패
            </p>
            <p>
              승률{' '}
              {((entry.wins / (entry.wins + entry.losses)) * 100).toFixed(0)}%
            </p>
          </div>
        </div>
        // </Link>
      ))}
    </div>
  )

  return (
    <div className="grid grid-cols-2 gap-3 m-3 text-on-surface-light dark:text-on-surface-dark">
      {RankList({ entries: soloRank.entries, rankType: '솔로랭크' })}
      {RankList({ entries: flexRank.entries, rankType: '자유랭크' })}
      <div className="flex items-center justify-center col-span-2">
        <Link
          href={'/leaderboard'}
          className="bg-surface-container-light dark:bg-surface-container-dark rounded-lg shadow-md m-2 p-2"
        >
          1
        </Link>
        <Link
          href={'/leaderboard/page2'}
          className="bg-surface-container-light dark:bg-surface-container-dark rounded-lg shadow-md m-2 p-2"
        >
          2
        </Link>
        <Link
          href={'/leaderboard/page3'}
          className="bg-surface-container-light dark:bg-surface-container-dark rounded-lg shadow-md m-2 p-2"
        >
          3
        </Link>
      </div>
    </div>
  )
}
