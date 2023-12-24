import { Post } from "./entities/Post";
import { __prod__ } from "./constants";
import { MikroORM } from "@mikro-orm/core";
import path from "path";
import dotenv from 'dotenv';
dotenv.config();
export default {
  migrations: {
    path: path.join(__dirname, "./migrations"),
    pattern: /^[\w-]+\d+\.[tj]s$/,
  },
  entities: [Post],
  dbName: "reddit",
  type: "postgresql",
  user:"postgres",
   password:process.env.password||"",
  debug: !__prod__,
} as Parameters<typeof MikroORM.init>[0];