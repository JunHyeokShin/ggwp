// 'use client'

// import { useState } from 'react'

// export default async function CommentList({ post }) {
//   const [userName, setUserName] = useState('')
//   const [comment, setComment] = useState('')

//   async function handleSubmit(e) {
//     e.preventDefault()

//     try {
//       const response = await fetch(`/api/posts/${post.postId}/comment`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ userName, comment }),
//       })
//       if (!response.ok) {
//         throw new Error('Failed to register comment')
//       }
//       router.refresh()
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <input type="text" onChange={(e) => setUserName(e.target.value)} />
//         <input type="text" onChange={(e) => setComment(e.target.value)} />
//         <button type="submit">등록</button>
//       </form>
//       <div>
//       </div>
//     </div>
//   )
// }
