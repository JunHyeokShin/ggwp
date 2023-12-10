import Link from 'next/link'
import Image from 'next/image'

async function getPosts() {
  try {
    const response = await fetch(`${process.env.LOCAL_API_URL}/api/posts`, {
      cache: 'no-store',
    })
    if (!response.ok) {
      throw new Error('Failed to fetch posts')
    }
    return response.json()
  } catch (error) {
    console.log(error)
  }
}

export default async function PostList() {
  const { posts } = await getPosts()

  return (
    <div className="grid gap-3 text-on-surface-light dark:text-on-surface-dark">
      {posts.map((post) => (
        <Link
          key={post.postId}
          href={`/community/${post.postId}`}
          className="flex bg-surface-container-light dark:bg-surface-container-dark rounded-lg hover:bg-surface-container-high-light dark:hover:bg-surface-container-high-dark"
        >
          <div className="flex items-center">
            <Image
              src={`https://i1.ytimg.com/vi/${post.videoUrl}/mqdefault.jpg`}
              width={200}
              height={112.5}
              alt={post.videoUrl}
              className="rounded-lg shadow-md"
            />
            <h1 className="font-bold text-3xl mx-3 overflow-hidden overflow-ellipsis whitespace-nowrap">
              {post.title}
            </h1>
          </div>
        </Link>
      ))}
    </div>
  )
}
