"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.database = void 0;
const client_1 = require("@prisma/client");
const database = new client_1.PrismaClient();
exports.database = database;
