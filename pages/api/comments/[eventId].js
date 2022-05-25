import { connectDB, insertDB, getComments } from "../../../helpers/db-util";

async function handler(req, res) {
  const eventId = req.query.eventId;

  let client;
  try {
    client = await connectDB();
  } catch (error) {
    return res
      .status(501)
      .json({ message: "Fail to connect to the database.", error: error });
  }

  if (req.method === "POST") {
    const { email, name, text } = req.body;
    if (
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input" });
      return;
    }

    const newComment = {
      id: eventId,
      email,
      name,
      text,
    };

    let result;
    try {
      result = await insertDB(client, "comment", newComment);
      res
        .status(201)
        .json({ mmessage: "Added comment", comment: result.insertedId });
    } catch (error) {
      res.status(501).json({
        message: "Fail to insert the new comment on the database.",
        error: error,
      });
    }

    client.close();
  } else if (req.method === "GET") {
    let comments = [];
    try {
      comments = await getComments(client, eventId);
      res.status(200).json({ comments: comments });
    } catch (error) {
      res.status(501).json({
        message: "Fail getting comments from the database.",
        error: error,
      });
    }

    client.close();
  }
}

export default handler;
