import { Resolver, Query, Arg, Int } from "type-graphql";
import { User } from "../models/User";

@Resolver(User)
export class UserResolver {
  @Query(() => [User])
  async users(): Promise<User[]> {
    const user = new User();
    user.id = 0;
    user.name = "toto";
    return [user];
  }

  @Query(() => User)
  async user(@Arg("id", (type) => Int) id: number): Promise<User> {
    const user = new User();
    user.id = id;
    user.name = "yo";
    return user;
  }
}
