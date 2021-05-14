import { Resolver, Query } from "type-graphql";
import { User } from "../models/User";

@Resolver(User)
export class UserResolver {
  @Query(() => [User])
  async users(): Promise<User[]> {
    return User.find();
  }
}
