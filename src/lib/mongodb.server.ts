import { MongoClient } from "mongodb";

const uri = process.env["MONGODB_URI"];
const dbName = process.env["MONGODB_DB"];
if (!uri) {
  throw new Error("MONGODB_URI is not defined");
}

if (!dbName) {
  throw new Error("MONGODB_DB is not defined");
}

const globalForMongo = globalThis as unknown as {
  mongoClient?: MongoClient;
};

export const mongoClient =
  globalForMongo.mongoClient ?? new MongoClient(uri);

if (process.env["NODE_ENV"] !== "production")  {
  globalForMongo.mongoClient = mongoClient;
}

export const mongoDb = mongoClient.db(dbName);