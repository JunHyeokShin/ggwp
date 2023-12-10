// import connectDB from '@/libs/database'
// import Post from '@/models/post'
// import { NextResponse } from 'next/server'

// export async function POST(request, { params }) {
//   const { id } = params
//   const { userName, comment } = await request.json()
//   const now = new Date()

//   await connectDB()
//   await Post.findOneAndUpdate(
//     { postId: id },
//     { id: now.getTime(), userName, comment, now }
//   )
//   return NextResponse.json({}, { statue: 200 })
// }
