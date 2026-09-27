import { mongoDb } from "./mongodb.server";
import type { User, HelpRequest } from "./store";

export const usersCollection = mongoDb.collection<User>("users");

export const requestsCollection =
  mongoDb.collection<HelpRequest>("requests");

export const activityCollection = mongoDb.collection("activity");

export async function findUserByPhone(phone: string) {
  const user = await usersCollection.findOne({ phone });

  if (!user) return null;

  const { _id, ...safeUser } = user;
  return safeUser;
}

export async function findUserById(id: string) {
  const user = await usersCollection.findOne({ id });

  if (!user) return null;

  const { _id, ...safeUser } = user;
  return safeUser;
}

export async function createUser(user: User) {
  await usersCollection.insertOne(user);
  return user;
}

export async function updateUser(
  id: string,
  update: Partial<User>,
) {
  await usersCollection.updateOne(
    { id },
    { $set: update },
  );

  return findUserById(id);
}
export async function findNgoByInviteCode(inviteCode: string) {
  const ngo = await usersCollection.findOne({
    role: "ngo",
    inviteCode: inviteCode.trim().toUpperCase(),
  });

  if (!ngo) return null;

  const { _id, ...safeNgo } = ngo;
  return safeNgo;
}