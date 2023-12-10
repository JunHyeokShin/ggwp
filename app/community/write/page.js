'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function WritePostPage() {
  const [title, setTitle] = useState('')
  const [videoUrl, setVideoUrl] = useState('')
  const [mainText, setMainText] = useState('')
  const router = useRouter()

  async function handleSubmit(e) {
    e.preventDefault()
    const postId = new Date().getTime()

    try {
      const response = await fetch(`/api/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postId, title, videoUrl, mainText }),
      })
      if (!response.ok) {
        throw new Error('Failed to post')
      }
      router.push('/community')
      router.refresh()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="m-3">
      <form className="grid grid-cols-1" onSubmit={handleSubmit}>
        <textarea
          type="text"
          placeholder="제목"
          onChange={(e) => setTitle(e.target.value)}
          rows={1}
          className="p-2 border border-outline-light dark:border-outline-dark bg-surface-container-light dark:bg-surface-container-dark text-on-surface-light dark:text-on-surface-dark"
        />
        <textarea
          type="text"
          placeholder="Youtube 동영상 주소"
          rows={1}
          onChange={(e) => setVideoUrl(e.target.value)}
          className="p-2 border border-outline-light dark:border-outline-dark bg-surface-container-light dark:bg-surface-container-dark text-on-surface-light dark:text-on-surface-dark"
        />
        <textarea
          type="text"
          placeholder="내용"
          rows={10}
          onChange={(e) => setMainText(e.target.value)}
          className="p-2 border border-outline-light dark:border-outline-dark bg-surface-container-light dark:bg-surface-container-dark text-on-surface-light dark:text-on-surface-dark"
        />
        <div className="mx-auto my-3">
          <button
            type="submit"
            className="h-10 rounded-full bg-primary-light dark:bg-primary-dark"
          >
            <p className="my-auto px-6 text-on-primary-light dark:text-on-primary-dark">
              게시
            </p>
          </button>
        </div>
      </form>
    </div>
  )
}
