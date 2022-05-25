import { connectDB, insertDB } from "../../../helpers/db-util";

async function handler(req, res) {
  if (req.method === "POST") {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "Invalid email address." });
      return;
    }

    let client;
    try {
      client = await connectDB();
    } catch (error) {
      return res
        .status(501)
        .json({ message: "Fail to connect to the database.", error: error });
    }

    try {
      await insertDB(client, "email", { email: userEmail });
      res.status(201).json({ message: "Signed up!" });
    } catch (error) {
      res.status(501).json({
        message: "Fail to insert the new email on the database.",
        error: error,
      });
    }

    client.close();
  }
}

export default handler;
