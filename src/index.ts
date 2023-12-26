import "reflect-metadata";
import {__prod__} from "./constants";
import {MikroORM} from "@mikro-orm/core";
import microConfig from "./mikro-orm.config";
import dotenv from 'dotenv';
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { PostResolver } from "./resolvers/post";
import { UserResolver } from "./resolvers/user";

dotenv.config();
const main = async () =>{
  const app = express();
    const orm = await MikroORM.init(microConfig);
    await orm.getMigrator().up();

    const apolloServer = new ApolloServer({
      schema: await buildSchema({
        resolvers: [ PostResolver, UserResolver],
        validate: false,
      }),
      context: () => ({ em: orm.em.fork() }),
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app });
    app.listen(4000, () => {
      console.log("server started on localhost:4000");
    });
  };

main().catch((err) => {
    console.error(err);
  });