import mongoose from 'mongoose'
const { Schema } = mongoose

const postSchema = new Schema(
  {
    postId: Number,
    title: String,
    videoUrl: String,
    mainText: String,
    comments: [
      {
        id: Number,
        userName: String,
        comment: String,
        createdAt: Date,
      },
    ],
  },
  {
    timestamps: true,
  }
)

export const Post = mongoose.models.Post || mongoose.model('Post', postSchema)

export default Post
