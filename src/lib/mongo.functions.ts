import { createServerFn } from "@tanstack/react-start";
import {
  findUserByPhone,
  findUserById,
  findNgoByInviteCode,
} from "./mongodb-store";
import type { User } from "./store";

export const getUserByPhone = createServerFn({ method: "GET" })
  .inputValidator((phone: string) => phone)
  .handler(async ({ data: phone }) => {
    return findUserByPhone(phone.replace(/\D/g, ""));
  });

export const getUserById = createServerFn({ method: "GET" })
  .inputValidator((id: string) => id)
  .handler(async ({ data: id }) => {
    return findUserById(id);
  });

  export const createMongoUser = createServerFn({ method: "POST" })
  .inputValidator((user: User) => user)
  .handler(async ({ data: user }) => {
    const existing = await findUserByPhone(user.phone);

    if (existing) {
      throw new Error("An account with this phone already exists.");
    }

    const { createUser } = await import("./mongodb-store");

    const created = await createUser(user);

    return { ok: true, userId: created.id };
  });

  export const testServerFunction = createServerFn({ method: "GET" })
  .handler(async () => {
    return "Mongo server function works";
  });

  export const testMongoWrite = createServerFn({ method: "POST" })
  .handler(async () => {
    const { usersCollection } = await import("./mongodb-store");

    const testUser = {
      id: `mongo-write-test-${Date.now()}`,
      role: "user" as const,
      name: "Mongo Write Test",
      phone: `88888${String(Date.now()).slice(-5)}`,
      passwordHash: "test-only",
      area: "Test Area",
      lat: 28.6139,
      lng: 77.209,
      verified: true,
      createdAt: Date.now(),
      people: 1,
    };

    await usersCollection.insertOne(testUser);

    return {
      ok: true,
      id: testUser.id,
    };
  });

  export const getNgoByInviteCode = createServerFn({ method: "GET" })
  .inputValidator((inviteCode: string) => inviteCode)
  .handler(async ({ data: inviteCode }) => {
    return findNgoByInviteCode(inviteCode);
  });