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
  let date

  return (
    <div className="grid gap-3">
      {posts.reverse().map((post) => (
        <Link
          key={post.postId}
          href={`/community/${post.postId}`}
          className="flex h-[112.5px] bg-surface-container-light dark:bg-surface-container-dark rounded-lg hover:bg-surface-container-high-light dark:hover:bg-surface-container-high-dark"
        >
          <div className="flex w-full">
            {post.videoUrl === '' ? (
              ''
            ) : (
              <Image
                src={`https://i1.ytimg.com/vi/${post.videoUrl}/mqdefault.jpg`}
                width={200}
                height={112.5}
                alt={post.videoUrl}
                className="rounded-lg shadow-md"
              />
            )}

            <div className="flex flex-col justify-between w-full m-3 overflow-hidden">
              <h1 className="font-bold text-3xl overflow-hidden overflow-ellipsis whitespace-nowrap">
                {post.title}
              </h1>
              <div className="flex justify-between">
                <p>
                  작성일{' '}
                  {new Date(post.postId).getFullYear() +
                    '-' +
                    (new Date(post.postId).getMonth() + 1)
                      .toString()
                      .padStart(2, '0') +
                    '-' +
                    new Date(post.postId)
                      .getDate()
                      .toString()
                      .padStart(2, '0') +
                    ' ' +
                    new Date(post.postId)
                      .getHours()
                      .toString()
                      .padStart(2, '0') +
                    ':' +
                    new Date(post.postId)
                      .getMinutes()
                      .toString()
                      .padStart(2, '0')}
                </p>

                <p>조회수 {post.counts}</p>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
