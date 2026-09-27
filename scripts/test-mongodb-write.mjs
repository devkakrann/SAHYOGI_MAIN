import "dotenv/config";
import { mongoClient, mongoDb } from "../src/lib/server/mongodb.ts";

const testCollection = mongoDb.collection("_sahyogi_connection_test");
const marker = `test-${Date.now()}`;

try {
  await mongoClient.connect();

  // Write
  await testCollection.insertOne({
    marker,
    message: "Sahyogi MongoDB test",
    createdAt: new Date(),
  });

  console.log("✅ MongoDB write successful!");

  // Read
  const found = await testCollection.findOne({ marker });

  if (!found) {
    throw new Error("Test document was not found after insert");
  }

  console.log("✅ MongoDB read successful!");

  // Cleanup
  await testCollection.deleteOne({ _id: found._id });

  console.log("✅ Test document cleaned up!");
  console.log("🎉 MongoDB write/read test passed!");
} catch (error) {
  console.error("❌ MongoDB write/read test failed:");
  console.error(error.message);
  process.exitCode = 1;
} finally {
  await mongoClient.close();
}