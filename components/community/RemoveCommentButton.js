'use client'

import { useRouter } from 'next/navigation'

export default function RemoveCommentButton({ post, commentId }) {
  const router = useRouter()

  async function handleClick(e) {
    try {
      const response = await fetch(
        `/api/posts/${post.postId}/comment/${commentId}`,
        {
          cache: 'no-store',
          method: 'DELETE',
        }
      )
      if (!response.ok) {
        throw new Error('Failed to delete comment')
      }
      router.refresh()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <button onClick={handleClick} className="flex">
        <span className="material-symbols-rounded my-auto">delete</span>
      </button>
    </div>
  )
}
