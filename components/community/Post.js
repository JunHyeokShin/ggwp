'use client'

import YouTube from 'react-youtube'
import CommentList from './CommentList'
import RemovePostButton from './RemovePostButton'

export default function Post({ post }) {
  return (
    <div className="m-3">
      <div className="p-3 rounded-lg bg-surface-container-light dark:bg-surface-container-dark text-on-surface-light dark:text-on-surface-dark text-xl">
        <h1 className="text-4xl font-black">{post.title}</h1>
        {post.videoUrl === '' ? (
          ''
        ) : (
          <YouTube videoId={post.videoUrl} className="my-3" />
        )}

        <p className="pt-3">{post.mainText}</p>
        <div className="flex justify-end">
          <RemovePostButton post={post} />
        </div>
      </div>
      <CommentList post={post} />
    </div>
  )
}
