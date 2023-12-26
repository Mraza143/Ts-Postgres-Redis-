import { Resolver, Query, Ctx, Arg, Mutation } from "type-graphql";
import { Post } from "../entities/Post";
import { MyContext } from "../types";

@Resolver()
export class PostResolver {
    //Find ALL Posts
  @Query(() => [Post])
  posts(@Ctx() { em }: MyContext): Promise<Post[]> {
    return em.find(Post, {});
  }
  //Send a single Post
  @Query(() => Post, { nullable: true })
  post(@Arg("id") id: number, @Ctx() { em }: MyContext): Promise<Post | null> {
    return em.findOne(Post, { id });
  }
  //Create a new post
  @Mutation(() => Post)
  async createPost(
    @Arg("title") title: string,
    @Arg("createdAt") createdAt: string,
    @Arg("updatedAt") updatedAt: string,
    @Ctx() { em }: MyContext
  ): Promise<Post> {
    const post = em.create(Post, { title , createdAt , updatedAt});
    await em.persistAndFlush(post);
    return post;
  }
  //Updating a post
  @Mutation(() => Post, { nullable: true })
  async updatePost(
    @Arg("id") id: number,
    @Arg("title", () => String, { nullable: true }) title: string,
    @Ctx() { em }: MyContext
  ): Promise<Post | null> {
    const post = await em.findOne(Post, { id });
    if (!post) {
      return null;
    }
    if (typeof title !== "undefined") {
      post.title = title;
      await em.persistAndFlush(post);
    }
    return post;
  }
  //Delete a post
  @Mutation(() => Boolean)
  async deletePost(
    @Arg("id") id: number,
    @Ctx() { em }: MyContext
  ): Promise<boolean> {
    await em.nativeDelete(Post, { id });
    return true;
  }
}