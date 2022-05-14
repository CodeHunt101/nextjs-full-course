import { buildFeedbackPath, extractFeedback } from '../api/feedback'
import { useState } from 'react'

const FeedBackPage = ({ feedbackItems }) => {
  const [feedbackData, setFeedbackData] = useState()

  const loadFeedbackHandler = async (id) => {
    const response = await fetch(`/api/feedback/${id}`)
    const data = await response.json()
    setFeedbackData(data.feedback)
  }

  return (
    <>
      {feedbackData && <p>{feedbackData.email}</p>}
      <ul>
        {feedbackItems.map((item) => (
          <li key={item.id}>
            {item.text}
            <button onClick={() => loadFeedbackHandler(item.id)}>
              Show Details
            </button>
          </li>
        ))}
      </ul>
    </>
  )
}

export const getStaticProps = () => {
  const filePath = buildFeedbackPath()
  const data = extractFeedback(filePath)

  return {
    props: {
      feedbackItems: data,
    },
  }
}

export default FeedBackPage
