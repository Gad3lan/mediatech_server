import { Resolver, Query, Arg, Int, Mutation } from "type-graphql";
import { Role, User } from "../models/User";

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
    const where: any = {};

    if (name) where.name = name;
    if (email) where.email = email;
    if (nb_strikes) where.nb_strikes = nb_strikes;
    if (roles) where.roles = roles;

    return User.find({ where });
  }

  @Mutation(() => User)
  async updateUser(
    @Arg("membership_id", () => String) membership_id: string,
    @Arg("name", () => String, { nullable: true }) name: string | undefined,
    @Arg("email", () => String, { nullable: true }) email: string | undefined,
    @Arg("nb_strikes", () => Int, { nullable: true })
    nb_strikes: number | undefined,
    @Arg("roles", () => Role, { nullable: true }) roles: Role | undefined
  ): Promise<User> {
    const user = await User.findOne({ where: { membership_id } });

    if (!user) throw "User don't exist";

    if (name) user.name = name;
    if (email) user.email = email;
    if (nb_strikes) user.nb_strikes = nb_strikes;
    if (roles) user.role = roles;

    return await user.save();
  }
}
