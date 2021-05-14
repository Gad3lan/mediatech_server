import { Resolver, Query } from "type-graphql";
import { User, Role } from "../models/User";

@Resolver(User)
export class UserResolver {
  @Query(() => [User])
  async users(): Promise<User[]> {
    const user = new User();

    user.email = "email";
    user.nb_strikes = 0;
    user.nb_rentals = 0;
    user.roles = Role.not_connected;

    return [user];
  }
}
