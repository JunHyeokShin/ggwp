import PostList from '@/components/community/PostList'
import Link from 'next/link'

export default function CommunityPage() {
  return (
    <div className="m-3 text-on-surface-light dark:text-on-surface-dark">
      <div className="flex justify-between items-center m-3">
        <h1 className="text-4xl font-black">커뮤니티</h1>
        <Link href="/community/write">
          <button
            type="submit"
            className="h-10 rounded-full bg-primary-light dark:bg-primary-dark"
          >
            <p className="my-auto px-6 text-on-primary-light dark:text-on-primary-dark">
              글 쓰기
            </p>
          </button>
        </Link>
      </div>
      <PostList />
    </div>
  )
}
