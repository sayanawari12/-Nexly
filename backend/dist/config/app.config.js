"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appConfig = void 0;
exports.appConfig = {
    port: Number(process.env.PORT) || 5000,
    env: process.env.NODE_ENV || 'development',
};
