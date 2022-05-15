import { MongoClient } from 'mongodb'

export const connectDatabase = async () => {
  return await MongoClient.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.a28iu.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
  )
}

export const insertDocument = async (client, collection, document) => {
  const db = client.db()
  return await db.collection(collection).insertOne(document)
}

export const getAllDocuments = async (
  client,
  collection,
  sort,
  filter = {}
) => {
  const db = client.db()

  const documents = await db
    .collection(collection)
    .find(filter)
    .sort(sort) //-1 desc +1 asc
    .toArray()

  return documents
}
