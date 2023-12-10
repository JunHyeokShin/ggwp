import Post from '@/components/community/Post'

async function getPostByPostId(id) {
  try {
    const response = await fetch(
      `${process.env.LOCAL_API_URL}/api/posts/${id}`,
      {
        cache: 'no-store',
        method: 'GET',
      }
    )
    if (!response.ok) {
      throw new Error('Failed to fetch post')
    }
    return response.json()
  } catch (error) {
    console.log(error)
  }
}

export default async function PostPage({ params: { id } }) {
  const { post } = await getPostByPostId(id)

  return (
    <div className="m-3">
      <Post post={post} />
    </div>
  )
}
