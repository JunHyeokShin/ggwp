import { getMatchDatabase } from '@/libs/database'

export default async function MatchCard({ matchId }) {
  const match = await getMatchDatabase(matchId)

  if (match === null) {
    return <p>해당 경기를 찾을 수 없습니다.</p>
  } else {
    return <div>{match.metadata.matchId}</div>
  }
}
