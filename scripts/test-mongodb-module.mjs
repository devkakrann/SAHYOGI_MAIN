import "dotenv/config";
import { mongoClient, mongoDb } from "../src/lib/server/mongodb.ts";

try {
  await mongoClient.connect();

  await mongoDb.command({ ping: 1 });

  console.log("✅ Server MongoDB module connected!");
  console.log(`✅ Database: ${mongoDb.databaseName}`);
} catch (error) {
  console.error("❌ Server MongoDB module failed:");
  console.error(error.message);
  process.exitCode = 1;
} finally {
  await mongoClient.close();
}