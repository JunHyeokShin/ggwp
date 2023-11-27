'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function PlayerSearchBar() {
  const [gameName, setGameName] = useState('')
  const [tagLine, setTagLine] = useState('KR1')
  const router = useRouter()

  function handleChange(event) {
    const gameNameAndTagLine = event.target.value.split('#')
    setGameName(gameNameAndTagLine[0])
    if (gameNameAndTagLine[1] !== undefined) {
      setTagLine(gameNameAndTagLine[1])
    }
  }

  function handleSubmit(event) {
    event.preventDefault()
    router.push(`/player/${gameName}-${tagLine}`)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="플레이어#태그" onChange={handleChange} />
      <button>검색</button>
    </form>
  )
}
