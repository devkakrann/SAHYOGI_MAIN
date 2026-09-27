const { MongoClient } = require("mongodb");

require("dotenv").config();

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;

if (!uri || !dbName) {
  throw new Error("MONGODB_URI or MONGODB_DB is missing");
}

const client = new MongoClient(uri);

async function main() {
  try {
    await client.connect();

    await client.db(dbName).command({ ping: 1 });

    console.log("✅ MongoDB connected successfully!");
    console.log(`✅ Database: ${dbName}`);
  } catch (error) {
    console.error("❌ MongoDB connection failed:");
    console.error(error.message);
    process.exitCode = 1;
  } finally {
    await client.close();
  }
}

main();