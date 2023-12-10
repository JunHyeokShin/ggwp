'use client'

import { useRouter } from 'next/navigation'

export default function RemovePostButton({ post }) {
  const router = useRouter()

  async function handleClick(e) {
    try {
      const response = await fetch(`/api/posts/${post.postId}`, {
        cache: 'no-store',
        method: 'DELETE',
      })
      if (!response.ok) {
        throw new Error('Failed to delete post')
      }
      router.push('/community')
      router.refresh()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <button onClick={handleClick} className="flex">
        <span className="material-symbols-rounded">delete</span>
      </button>
    </div>
  )
}
