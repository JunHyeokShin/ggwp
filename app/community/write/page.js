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
      <form className="grid grid-cols-1 gap-3" onSubmit={handleSubmit}>
        <lable>
          제목
          <input type="text" onChange={(e) => setTitle(e.target.value)} />
        </lable>
        <lable>
          유튜브 동영상 주소
          <input type="text" onChange={(e) => setVideoUrl(e.target.value)} />
        </lable>
        <lable>
          본문
          <input type="text" onChange={(e) => setMainText(e.target.value)} />
        </lable>
        <button type="submit">게시하기</button>
      </form>
    </div>
  )
}
