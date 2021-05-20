import { Resolver, Query, Arg, Int } from "type-graphql";
import { User } from "../models/User";

@Resolver(User)
export class UserResolver {
  @Query(() => [User])
  async user(
    @Arg("name", () => String, { nullable: true }) name: string | undefined,
    @Arg("email", () => String, { nullable: true }) email: string | undefined,
    @Arg("nb_strikes", () => Int, { nullable: true })
    nb_strikes: number | undefined,
    @Arg("roles", () => String, { nullable: true }) roles: string | undefined
  ): Promise<User[]> {
    return User.find({ where: { name, email, nb_strikes, roles } });
  }
}
