import { Resolver, Mutation, Arg, InputType, Field, Ctx } from "type-graphql";
import { MyContext } from "../types";
import { User } from "../entities/User";
import argon2 from "argon2";

@InputType()
class UsernamePasswordInput {
  @Field()
  username: string;
  @Field()
  password: string;
}

@Resolver()
export class UserResolver {
  @Mutation(() => User)
  async register(
    @Arg("options") options: UsernamePasswordInput,
    @Arg("createdAt") createdAt: string,
    @Arg("updatedAt") updatedAt: string,
    @Ctx() { em }: MyContext
  ) {
    const hashedPassword = await argon2.hash(options.password);
    const user = em.create(User, {
      username: options.username,
      password: hashedPassword,
      createdAt:createdAt,
      updatedAt:updatedAt
    });
    await em.persistAndFlush(user);
    return user;
  }
}