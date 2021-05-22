import { Resolver, Query, Arg, Int, Mutation } from "type-graphql";
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

  @Mutation(() => User)
  async updateUser(
    @Arg("membership_id", () => String) membership_id: string,
    @Arg("name", () => String, { nullable: true }) name: string | undefined,
    @Arg("email", () => String, { nullable: true }) email: string | undefined,
    @Arg("nb_strikes", () => Int, { nullable: true })
    nb_strikes: number | undefined,
    @Arg("roles", () => String, { nullable: true }) roles: string | undefined
  ): Promise<User> {
    const user = await User.findOne({ where: { membership_id } });

    if (user !== undefined) {
      // if (name !== undefined) user.name = name;
      if (email !== undefined) user.email = email;
      if (nb_strikes !== undefined) user.nb_strikes = nb_strikes;
      // if (roles !== undefined) user.roles = roles;

      return await user.save();
    } else throw "User don't exist";
  }
}
