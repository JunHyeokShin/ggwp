import Link from 'next/link'

export default function Header() {
  return (
    <nav
      className="shadow-md bg-surface-container-low-light dark:bg-surface-container-low-dark
      text-on-surface-light dark:text-on-surface-dark"
    >
      <div className="max-w-7xl min-w-[1024px] mx-auto h-20 p-6 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/">
            <h1 className="exo-2 text-5xl font-black italic">GGWP</h1>
          </Link>
        </div>
        <div className="flex items-center">
          <Link
            href="/"
            className="flex items-center mx-1 px-2 rounded-full
            hover:bg-on-surface-light hover:dark:bg-on-surface-dark hover:bg-opacity-8 hover:dark:bg-opacity-8
            hover:text-on-secondary-container-light hover:dark:text-on-secondary-container-dark
            active:bg-on-secondary-container-light active:dark:bg-on-secondary-container-dark
            active:bg-opacity-8 active:dark:bg-opacity-8"
          >
            <span className="material-symbols-rounded">home</span>
            <p className="text-lg ml-1">홈</p>
          </Link>
          <Link
            href="/"
            className="flex items-center mx-1 px-2 rounded-full
            hover:bg-on-surface-light hover:dark:bg-on-surface-dark hover:bg-opacity-8 hover:dark:bg-opacity-8
            hover:text-on-secondary-container-light hover:dark:text-on-secondary-container-dark
            active:bg-on-secondary-container-light active:dark:bg-on-secondary-container-dark
            active:bg-opacity-8 active:dark:bg-opacity-8"
          >
            <span className="material-symbols-rounded">monitoring</span>
            <p className="text-lg ml-1">통계</p>
          </Link>
          <Link
            href="/"
            className="flex items-center mx-1 px-2 rounded-full
            hover:bg-on-surface-light hover:dark:bg-on-surface-dark hover:bg-opacity-8 hover:dark:bg-opacity-8
            hover:text-on-secondary-container-light hover:dark:text-on-secondary-container-dark
            active:bg-on-secondary-container-light active:dark:bg-on-secondary-container-dark
            active:bg-opacity-8 active:dark:bg-opacity-8"
          >
            <span className="material-symbols-rounded">social_leaderboard</span>
            <p className="text-lg ml-1">랭킹</p>
          </Link>
          <Link
            href="/community"
            className="flex items-center mx-1 px-2 rounded-full
            hover:bg-on-surface-light hover:dark:bg-on-surface-dark hover:bg-opacity-8 hover:dark:bg-opacity-8
            hover:text-on-secondary-container-light hover:dark:text-on-secondary-container-dark
            active:bg-on-secondary-container-light active:dark:bg-on-secondary-container-dark
            active:bg-opacity-8 active:dark:bg-opacity-8"
          >
            <span className="material-symbols-rounded">groups</span>
            <p className="text-lg ml-1">커뮤니티</p>
          </Link>
        </div>
      </div>
    </nav>
  )
}
