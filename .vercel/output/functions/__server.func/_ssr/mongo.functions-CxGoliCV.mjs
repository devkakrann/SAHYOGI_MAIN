import { c as createServerFn, i as TSS_SERVER_FUNCTION } from "./createServerFn-CIHAFgYl.mjs";
import { t as require_lib } from "../_libs/mongodb.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/mongo.functions-CxGoliCV.js
var import_lib = require_lib();
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var uri = process.env["MONGODB_URI"];
var dbName = process.env["MONGODB_DB"];
if (!uri) throw new Error("MONGODB_URI is not defined");
if (!dbName) throw new Error("MONGODB_DB is not defined");
var mongoDb = (globalThis.mongoClient ?? new import_lib.MongoClient(uri)).db(dbName);
var usersCollection = mongoDb.collection("users");
mongoDb.collection("requests");
mongoDb.collection("activity");
async function findUserByPhone(phone) {
	const user = await usersCollection.findOne({ phone });
	if (!user) return null;
	const { _id, ...safeUser } = user;
	return safeUser;
}
async function findUserById(id) {
	const user = await usersCollection.findOne({ id });
	if (!user) return null;
	const { _id, ...safeUser } = user;
	return safeUser;
}
async function createUser(user) {
	await usersCollection.insertOne(user);
	return user;
}
async function findNgoByInviteCode(inviteCode) {
	const ngo = await usersCollection.findOne({
		role: "ngo",
		inviteCode: inviteCode.trim().toUpperCase()
	});
	if (!ngo) return null;
	const { _id, ...safeNgo } = ngo;
	return safeNgo;
}
var getUserByPhone_createServerFn_handler = createServerRpc({
	id: "c9878e09acc8ec03fd4a87e0075018a4682f89ee245e3a6ffe9088adfd9ca430",
	name: "getUserByPhone",
	filename: "src/lib/mongo.functions.ts"
}, (opts) => getUserByPhone.__executeServer(opts));
var getUserByPhone = createServerFn({ method: "GET" }).inputValidator((phone) => phone).handler(getUserByPhone_createServerFn_handler, async ({ data: phone }) => {
	return findUserByPhone(phone.replace(/\D/g, ""));
});
var getUserById_createServerFn_handler = createServerRpc({
	id: "ce652d1b63b6598c4ed0a0a65c5f731a483e92d5219e79af45740a09b65e7b77",
	name: "getUserById",
	filename: "src/lib/mongo.functions.ts"
}, (opts) => getUserById.__executeServer(opts));
var getUserById = createServerFn({ method: "GET" }).inputValidator((id) => id).handler(getUserById_createServerFn_handler, async ({ data: id }) => {
	return findUserById(id);
});
var createMongoUser_createServerFn_handler = createServerRpc({
	id: "b400316880114efdb275589967ec0f9d86e5cdbb34a86773ef3ea7044d21db91",
	name: "createMongoUser",
	filename: "src/lib/mongo.functions.ts"
}, (opts) => createMongoUser.__executeServer(opts));
var createMongoUser = createServerFn({ method: "POST" }).inputValidator((user) => user).handler(createMongoUser_createServerFn_handler, async ({ data: user }) => {
	if (await findUserByPhone(user.phone)) throw new Error("An account with this phone already exists.");
	const { createUser } = await import("./mongodb-store-DUghVPrq.mjs");
	return await createUser(user);
});
var testServerFunction_createServerFn_handler = createServerRpc({
	id: "ae8dd8af6f9c1da0919daef80257e107089a273b7b59cb2bf335e9e90dab42f3",
	name: "testServerFunction",
	filename: "src/lib/mongo.functions.ts"
}, (opts) => testServerFunction.__executeServer(opts));
var testServerFunction = createServerFn({ method: "GET" }).handler(testServerFunction_createServerFn_handler, async () => {
	return "Mongo server function works";
});
var testMongoWrite_createServerFn_handler = createServerRpc({
	id: "c5d49b1247a1db401a0803b6ee8ac14afe558b14fed70862e703ab6acf5a107e",
	name: "testMongoWrite",
	filename: "src/lib/mongo.functions.ts"
}, (opts) => testMongoWrite.__executeServer(opts));
var testMongoWrite = createServerFn({ method: "POST" }).handler(testMongoWrite_createServerFn_handler, async () => {
	const { usersCollection } = await import("./mongodb-store-DUghVPrq.mjs");
	const testUser = {
		id: `mongo-write-test-${Date.now()}`,
		role: "user",
		name: "Mongo Write Test",
		phone: `88888${String(Date.now()).slice(-5)}`,
		passwordHash: "test-only",
		area: "Test Area",
		lat: 28.6139,
		lng: 77.209,
		verified: true,
		createdAt: Date.now(),
		people: 1
	};
	await usersCollection.insertOne(testUser);
	return {
		ok: true,
		id: testUser.id
	};
});
var getNgoByInviteCode_createServerFn_handler = createServerRpc({
	id: "c23cf2c859a70d68076359be9fa5e705b8948a1fb37f0e8a75f20c4dbca8ca40",
	name: "getNgoByInviteCode",
	filename: "src/lib/mongo.functions.ts"
}, (opts) => getNgoByInviteCode.__executeServer(opts));
var getNgoByInviteCode = createServerFn({ method: "GET" }).inputValidator((inviteCode) => inviteCode).handler(getNgoByInviteCode_createServerFn_handler, async ({ data: inviteCode }) => {
	return findNgoByInviteCode(inviteCode);
});
//#endregion
export { usersCollection as a, createMongoUser_createServerFn_handler, getNgoByInviteCode_createServerFn_handler, getUserById_createServerFn_handler, getUserByPhone_createServerFn_handler, findUserByPhone as i, findNgoByInviteCode as n, findUserById as r, createUser as t, testMongoWrite_createServerFn_handler, testServerFunction_createServerFn_handler };
