import connectDB from '@/libs/database'
import Post from '@/models/post'
import { NextResponse } from 'next/server'

export async function GET(request, { params }) {
  const { id } = params

  await connectDB()
  const post = await Post.findOne({ postId: id })
  return NextResponse.json({ post }, { status: 200 })
}

export async function PUT(request, { params }) {
  const { id } = params
  const {
    newTitle: title,
    newVideoUrl: videoUrl,
    newMainText: mainText,
  } = await request.json()

  await connectDB()
  await Post.findOneAndUpdate({ postId: id }, { title, videoUrl, mainText })
  return NextResponse.json({}, { status: 200 })
}

export async function DELETE(request, { params }) {
  const { id } = params

  await connectDB()
  await Post.findOneAndUpdate({ postId: id }, { comments: [null] })
  return NextResponse.json({}, { status: 200 })
}
