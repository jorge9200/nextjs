import { MongoClient } from "mongodb";
const uri =
  "mongodb+srv://jorge9200:Alast0rLuc1lle@cluster0.7ihfx9a.mongodb.net/?retryWrites=true&w=majority";

export async function connectDB() {
  const client = await MongoClient.connect(uri);
  return client;
}

export async function insertDB(client, collection, document) {
  const db = client.db("nextJs");
  return await db.collection(collection).insertOne(document);
}

export async function getComments(client, eventId) {
  const db = client.db("nextJs");
  let comments = await db
    .collection("comment")
    .find()
    .sort({ _id: -1 })
    .toArray();

  comments = comments.filter((comment) => {
    return comment.id == String(eventId);
  });

  return comments;
}
