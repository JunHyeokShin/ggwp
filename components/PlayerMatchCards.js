import PlayerMatchCard from './PlayerMatchCard'

export default function PlayerMatchCards({ player }) {
  return (
    <div className="grid gap-3 col-span-2 xl:col-span-3">
      {player.matches.map((match, index) => (
        <div key={match[0]}>
          <PlayerMatchCard player={player} matchId={player.matches[index]} />
        </div>
      ))}
    </div>
  )
}
