import Link from 'next/link'

export default function Navigation() {
  return (
    <nav
      className="flex flex-col justify-between fixed w-80 h-full rounded-r-2xl p-3 shadow-lg
      bg-surface-container-low-light dark:bg-surface-container-low-dark
      text-on-surface-variant-light dark:text-on-surface-variant-dark"
    >
      <div>
        <Link
          href="/"
          className="flex justify-center items-center h-14 px-4 mb-4 exo-2 text-4xl font-black italic"
        >
          <h1>GGWP</h1>
        </Link>
        <Link
          href="/"
          className="flex items-center h-14 px-4 rounded-full
          hover:bg-on-surface-light hover:dark:bg-on-surface-dark hover:bg-opacity-8 hover:dark:bg-opacity-8
          hover:text-on-secondary-container-light hover:dark:text-on-secondary-container-dark
          active:bg-on-secondary-container-light active:dark:bg-on-secondary-container-dark
          active:bg-opacity-8 active:dark:bg-opacity-8"
        >
          <span className="material-symbols-rounded text-2xl">home</span>
          <p className="text-lg ml-3">홈</p>
        </Link>
        <Link
          href="/"
          className="flex items-center h-14 px-4 rounded-full
          hover:bg-on-surface-light hover:dark:bg-on-surface-dark hover:bg-opacity-8 hover:dark:bg-opacity-8
          hover:text-on-secondary-container-light hover:dark:text-on-secondary-container-dark
          active:bg-on-secondary-container-light active:dark:bg-on-secondary-container-dark
          active:bg-opacity-8 active:dark:bg-opacity-8"
        >
          <span className="material-symbols-rounded text-2xl">monitoring</span>
          <p className="text-lg ml-3">통계</p>
        </Link>
        <Link
          href="/"
          className="flex items-center h-14 px-4 rounded-full
          hover:bg-on-surface-light hover:dark:bg-on-surface-dark hover:bg-opacity-8 hover:dark:bg-opacity-8
          hover:text-on-secondary-container-light hover:dark:text-on-secondary-container-dark
          active:bg-on-secondary-container-light active:dark:bg-on-secondary-container-dark
          active:bg-opacity-8 active:dark:bg-opacity-8"
        >
          <span className="material-symbols-rounded text-2xl">
            social_leaderboard
          </span>
          <p className="text-lg ml-3">랭킹</p>
        </Link>
        <Link
          href="/"
          className="flex items-center h-14 px-4 rounded-full
          hover:bg-on-surface-light hover:dark:bg-on-surface-dark hover:bg-opacity-8 hover:dark:bg-opacity-8
          hover:text-on-secondary-container-light hover:dark:text-on-secondary-container-dark
          active:bg-on-secondary-container-light active:dark:bg-on-secondary-container-dark
          active:bg-opacity-8 active:dark:bg-opacity-8"
        >
          <span className="material-symbols-rounded text-2xl">groups</span>
          <p className="text-lg ml-3">커뮤니티</p>
        </Link>
      </div>
      <div>Foot</div>
    </nav>
  )
}
