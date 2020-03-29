import dotenv from 'dotenv';
import path from "path";

const env = process.env.NODE_ENV || "dev";

dotenv.config({
    path: path.join(__dirname, `../env/${env}.env`)
});

console.log("process.env", process.env);
export default {
    APP: process.env.APP || 'development',
    PORT: process.env.PORT || '3000',
    REDIS_HOST: process.env.REDIS_HOST,
    REDIS_PORT: +process.env.REDIS_PORT,
    REDIS_DB: +process.env.REDIS_DB
}
