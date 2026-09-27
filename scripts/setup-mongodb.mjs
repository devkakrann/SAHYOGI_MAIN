import "dotenv/config";
import { MongoClient } from "mongodb";

const uri = process.env["MONGODB_URI"];
const dbName = process.env["MONGODB_DB"];

if (!uri || !dbName) {
  throw new Error("MONGODB_URI or MONGODB_DB is missing");
}

const client = new MongoClient(uri);

try {
  await client.connect();

  const db = client.db(dbName);

  const existing = await db.listCollections().toArray();
  const existingNames = new Set(existing.map((c) => c.name));

  for (const name of ["users", "requests", "activity"]) {
    if (!existingNames.has(name)) {
      await db.createCollection(name);
      console.log(`✅ Created collection: ${name}`);
    } else {
      console.log(`ℹ️ Collection already exists: ${name}`);
    }
  }

  console.log(`🎉 MongoDB setup complete: ${dbName}`);
} catch (error) {
  console.error("❌ MongoDB setup failed:");
  console.error(error.message);
  process.exitCode = 1;
} finally {
  await client.close();
}