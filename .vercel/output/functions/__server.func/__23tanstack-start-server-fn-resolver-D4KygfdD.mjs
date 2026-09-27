//#region node_modules/.nitro/vite/services/ssr/assets/__23tanstack-start-server-fn-resolver-D4KygfdD.js
var manifest = {
	"ae8dd8af6f9c1da0919daef80257e107089a273b7b59cb2bf335e9e90dab42f3": {
		functionName: "testServerFunction_createServerFn_handler",
		importer: () => import("./_ssr/mongo.functions-CxGoliCV.mjs")
	},
	"b400316880114efdb275589967ec0f9d86e5cdbb34a86773ef3ea7044d21db91": {
		functionName: "createMongoUser_createServerFn_handler",
		importer: () => import("./_ssr/mongo.functions-CxGoliCV.mjs")
	},
	"c23cf2c859a70d68076359be9fa5e705b8948a1fb37f0e8a75f20c4dbca8ca40": {
		functionName: "getNgoByInviteCode_createServerFn_handler",
		importer: () => import("./_ssr/mongo.functions-CxGoliCV.mjs")
	},
	"c5d49b1247a1db401a0803b6ee8ac14afe558b14fed70862e703ab6acf5a107e": {
		functionName: "testMongoWrite_createServerFn_handler",
		importer: () => import("./_ssr/mongo.functions-CxGoliCV.mjs")
	},
	"c9878e09acc8ec03fd4a87e0075018a4682f89ee245e3a6ffe9088adfd9ca430": {
		functionName: "getUserByPhone_createServerFn_handler",
		importer: () => import("./_ssr/mongo.functions-CxGoliCV.mjs")
	},
	"ce652d1b63b6598c4ed0a0a65c5f731a483e92d5219e79af45740a09b65e7b77": {
		functionName: "getUserById_createServerFn_handler",
		importer: () => import("./_ssr/mongo.functions-CxGoliCV.mjs")
	}
};
async function getServerFnById(id, access) {
	const serverFnInfo = manifest[id];
	if (!serverFnInfo) throw new Error("Server function info not found for " + id);
	const fnModule = serverFnInfo.module ?? await serverFnInfo.importer();
	if (!fnModule) throw new Error("Server function module not resolved for " + id);
	const action = fnModule[serverFnInfo.functionName];
	if (!action) throw new Error("Server function module export not resolved for serverFn ID: " + id);
	return action;
}
//#endregion
export { getServerFnById as t };
