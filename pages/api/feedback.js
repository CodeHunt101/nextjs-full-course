import fs from 'fs'
import path from 'path'

const buildFeedbackPath = () => {
  return path.join(process.cwd(), 'data', 'feedback.json')
}

const extractFeedback = (filePath) => {
  const fileData = fs.readFileSync(filePath)
  const data = JSON.parse(fileData)
  return data
}

const handler = (req, res) => {
  const filePath = buildFeedbackPath()
  const data = extractFeedback(filePath)

  if (req.method === 'POST') {
    console.log(req)
    const email = req.body.email
    const feedbackText = req.body.text

    const newFeedback = {
      id: new Date().toISOString(),
      email,
      text: feedbackText,
    }
    // store that in a database or in a file
    data.push(newFeedback)
    fs.writeFileSync(filePath, JSON.stringify(data))
    res.status(201).json({ message: 'Sucess!!', feedback: newFeedback })
  } else {
    res.status(200).json({ feedback: data })
  }
}

export default handler
