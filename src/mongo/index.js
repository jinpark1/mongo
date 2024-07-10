import { MongoClient, ServerApiVersion } from "mongodb";
const uri = "mongodb+srv://jinpark1dev:yt2KVKP3LxTQrD9f@cluster0.1iadk7w.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export async function setupDatabase() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const db = client.db("sample_mflix");
    return {
      client,
      db,
      users: db.collection("users"),
      movies: db.collection("movies"),
      comments: db.collection("comments"),
    };
  } catch (error) {
    console.log("Error connection to the database: ", error);

    return {};
  }
}
