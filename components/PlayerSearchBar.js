'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import 'material-symbols'

export default function PlayerSearchBar() {
  const [gameName, setGameName] = useState('')
  const [tagLine, setTagLine] = useState('')
  const router = useRouter()

  function handleChange(event) {
    const gameNameAndTagLine = event.target.value.split('#')

    setGameName(gameNameAndTagLine[0])
    if (gameNameAndTagLine[1] === undefined || gameNameAndTagLine[1] === '') {
      setTagLine('KR1')
    } else {
      setTagLine(gameNameAndTagLine[1])
    }
  }

  function handleSubmit(event) {
    event.preventDefault()
    router.push(`/player/${gameName}-${tagLine}`)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-full justify-between bg-white divide-x px-5 py-2 w-6/12"
    >
      <input
        type="text"
        placeholder="플레이어#태그"
        onChange={handleChange}
        className="bg-transparent w-11/12 outline-none"
      />
      <button className="material-symbols-rounded align-middle pl-3 w-1/12">
        Search
      </button>
    </form>
  )
}
