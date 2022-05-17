import { useEffect, useState } from 'react'

import CommentList from './comment-list'
import NewComment from './new-comment'
import classes from './comments.module.css'
import NotificationContext from '../../store/notification-context'
import { useContext } from 'react'

function Comments({ eventId }) {
  const notificationCtx = useContext(NotificationContext)

  const [showComments, setShowComments] = useState(false)
  const [comments, setComments] = useState([])
  const [loader, setLoader] = useState(false)

  useEffect(async () => {
    if (showComments) {
      setLoader(true)
      const response = await fetch(`/api/comments/${eventId}`)
      const data = await response.json()
      setComments(data.comments)
      setLoader(false)
    }
  }, [showComments])

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus)
  }

  const addCommentHandler = async (commentData) => {
    notificationCtx.showNotification({
      title: 'Sending comment...',
      message: 'Your comment is currently being stored into a database',
      status: 'pending',
    })

    try {
      const response = await fetch(`/api/comments/${eventId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(commentData),
      })

      let data
      if (response.ok) {
        data = await response.json()
      } else {
        throw new Error(response.json().message || 'Something went wrongyyy')
      }

      notificationCtx.showNotification({
        title: 'Success!',
        message: 'Successfully sent comment',
        status: 'success',
      })
    } catch (error) {
      notificationCtx.showNotification({
        title: 'Error!',
        message: error.message || 'Something went wrong',
        status: 'error',
      })
    }
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {loader && showComments && <p>Loading comments...</p>}
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList items={comments} />}
      {showComments && loader && <p>Loading...</p>}
    </section>
  )
}

export default Comments
