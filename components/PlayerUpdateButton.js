'use client'

import { updatePlayer } from '@/libs/actions'

export default function PlayerUpdateButton({ puuid, gameName, tagLine }) {
  const handleSubmit = updatePlayer.bind(null, puuid, gameName, tagLine)

  return (
    <form action={handleSubmit}>
      <button
        type="submit"
        className="h-10 rounded-full bg-primary-light dark:bg-primary-dark"
      >
        <p className="my-auto px-6 text-on-primary-light dark:text-on-primary-dark">
          전적 갱신
        </p>
      </button>
    </form>
  )
}
