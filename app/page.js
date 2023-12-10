import PlayerSearchBar from '@/components/PlayerSearchBar'
import 'material-symbols'

export default function Home() {
  return (
    <div>
      <div className="grid place-items-center mt-16 mb-14">
        <PlayerSearchBar />
      </div>

      <div className="grid grid-cols-2 xl:grid-cols-2 gap-2 place-items-center text-on-surface-light dark:text-on-surface-dark"></div>
    </div>
  )
}
