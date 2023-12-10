'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import RemoveCommentButton from './RemoveCommentButton'

export default function CommentList({ post }) {
  const [userName, setUserName] = useState('')
  const [comment, setComment] = useState('')
  const router = useRouter()

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      const response = await fetch(`/api/posts/${post.postId}/comment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userName, comment }),
      })
      if (!response.ok) {
        throw new Error('Failed to register comment')
      }
      setUserName('')
      setComment('')
      router.refresh()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="grid gap-1 my-3 p-3 rounded-lg bg-surface-container-light dark:bg-surface-container-dark text-on-surface-light dark:text-on-surface-dark">
      <div>
        <form
          onSubmit={handleSubmit}
          className="flex items-center justify-between w-full"
        >
          <div className="w-[90%]">
            <input
              type="text"
              maxLength={10}
              placeholder="닉네임"
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value)
              }}
              className="p-3 w-[20%] rounded-l-lg border border-outline-light dark:border-outline-dark bg-surface-container-low-light dark:bg-surface-container-low-dark"
            />
            <input
              type="text"
              placeholder="내용"
              value={comment}
              onChange={(e) => {
                setComment(e.target.value)
              }}
              className="p-3 w-[80%] rounded-r-lg border border-outline-light dark:border-outline-dark bg-surface-container-low-light dark:bg-surface-container-low-dark"
            />
          </div>
          <button
            type="submit"
            className="mx-3 h-10 rounded-full bg-primary-light dark:bg-primary-dark"
          >
            <p className="my-auto px-6 text-on-primary-light dark:text-on-primary-dark">
              등록
            </p>
          </button>
        </form>
      </div>
      <div className="grid gap-1 rounded-lg bg-surface-container-low-light dark:bg-surface-container-low-dark">
        {post.comments[0] === null || post.comments === undefined
          ? ''
          : post.comments.map((comment) => (
              <div
                key={comment.id}
                className="flex justify-between items-center py-2 px-3 border-b border-outline-dark"
              >
                <div className="flex">
                  <p className="min-w-[200px]">{comment.userName}</p>
                  <p className="pl-2">{comment.comment}</p>
                </div>
                <div className="flex items-center">
                  <p className="mr-2">
                    {(new Date(post.postId).getMonth() + 1)
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
                  <RemoveCommentButton post={post} commentId={comment.id} />
                </div>
              </div>
            ))}
      </div>
    </div>
  )
}
