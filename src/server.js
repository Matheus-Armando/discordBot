"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const fastify_1 = __importDefault(require("fastify"));
const server = (0, fastify_1.default)({});
server.get('/ping', async (request, reply) => {
    return { pong: 'it worked!' };
});
const start = async () => {
    try {
        await server.listen({ port: 3000 });
        const address = server.server.address();
        const port = typeof address === 'string' ? address : address === null || address === void 0 ? void 0 : address.port;
        server.log.info(`Server running at: ${port}`);
    }
    catch (err) {
        server.log.error(err);
        process.exit(1);
    }
};
await start();
