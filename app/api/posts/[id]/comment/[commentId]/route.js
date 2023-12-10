import connectDB from '@/libs/database'
import Post from '@/models/post'
import { NextResponse } from 'next/server'

export async function DELETE(request, { params }) {
  const { id, commentId } = params
  console.log(id, commentId)

  await connectDB()
  await Post.findOneAndUpdate(
    { postId: id },
    {
      $pull: {
        comments: { id: commentId },
      },
    }
  )
  return NextResponse.json({}, { status: 200 })
}
