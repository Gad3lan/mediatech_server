import { Resolver, Query, Arg } from "type-graphql";
import { User } from "../models/User";

@Resolver(User)
export class UserResolver {
  @Query(() => [User])
  async users(): Promise<User[]> {
    return User.find();
  }

  @Query(() => User)
  async user_by_id(@Arg("id", () => String) id: string): Promise<User> {
    const user = await User.findOne(id);

    if (user === undefined) throw "User not found";

    return user;
  }
}
