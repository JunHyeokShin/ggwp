'use client'

import YouTube from 'react-youtube'

export default function Post({ post }) {
  return (
    <div className="m-3">
      <div className="text-on-surface-light dark:text-on-surface-dark text-xl">
        <h1 className="my-3">{post.title}</h1>
        <YouTube videoId={post.videoUrl} className="my-3" />
        <p>{post.mainText}</p>
      </div>
    </div>
  )
}
