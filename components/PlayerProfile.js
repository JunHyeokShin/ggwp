import { fetchIdFromPuuid } from '@/libs/utils'

export default async function PlayerProfile({ puuid }) {
  const id = await fetchIdFromPuuid(puuid)
  return (
    <div>
      <p>{puuid}</p>
      <p>{id}</p>
    </div>
  )
}
