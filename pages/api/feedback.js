import fs from 'fs'
import path from 'path'

const handler = (req, res) => {
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
    const filePath = path.join(process.cwd(), 'data', 'feedbackText.json')
    const fileData = fs.readFileSync(filePath)
    const data = JSON.parse(fileData)
    data.push(newFeedback)
    fs.writeFileSync(filePath, JSON.stringify(data))
    res.status(201).json({ message: 'Sucess!!', feedback: newFeedback })
  } else {
    res.status(200).json({ message: 'This works!' })
  }
}

export default handler
