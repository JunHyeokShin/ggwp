import connectDB from '@/libs/database'
import Post from '@/models/post'
import { NextResponse } from 'next/server'

export async function POST(request) {
  const { postId, title, videoUrl, mainText } = await request.json()
  const youtubeUrl = videoUrl
    .replace('https://youtu.be/', '')
    .replace('youtu.be/', '')
    .replace('https://www.youtube.com/watch?v=', '')
    .replace('www.youtube.com/watch?v=', '')
    .replace('youtube.com/watch?v=', '')

  await connectDB()
  await Post.create({
    postId,
    title,
    videoUrl: youtubeUrl,
    mainText,
    counts: 0,
  })
  return NextResponse.json({}, { status: 201 })
}

export async function GET(request) {
  await connectDB()
  const posts = await Post.find()
  return NextResponse.json({ posts }, { status: 200 })
}
