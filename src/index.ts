import {MikroORM} from "@mikro-orm/core";
import {__prod__} from "./constants";
import microConfig from "./mikro-orm.config";
import dotenv from 'dotenv';

import { Post } from "./entities/Post";
dotenv.config();
const main = async () =>{
    console.log("ASD")
    console.log(process.env.password)
    const orm = await MikroORM.init(microConfig);
    await orm.getMigrator().up();
    const em = orm.em.fork();

const post = em.create(Post, {
  title: "My First Post",
  createdAt: new Date(),
  updatedAt: new Date(),
});


await em.persistAndFlush(post);

};
main().catch((err) => {
    console.error(err);
  });