import { Context } from "graphql-passport/lib/buildContext";
import { Resolver, Query, Arg, Int, Mutation, Ctx } from "type-graphql";
import { Role, User } from "../models/User";

@Resolver(User)
export class UserResolver {
  @Query(() => [User])
  async user(
    @Arg("name", () => String, { nullable: true }) name: string | undefined,
    @Arg("email", () => String, { nullable: true }) email: string | undefined,
    @Arg("nb_strikes", () => Int, { nullable: true })
    nb_strikes: number | undefined,
    @Arg("role", () => Role, { nullable: true }) role: Role | undefined
  ): Promise<User[]> {
    const where: any = {};

    if (name) where.name = name;
    if (email) where.email = email;
    if (nb_strikes) where.nb_strikes = nb_strikes;
    if (role) where.role = role;

    return User.find({ where });
  }

  @Mutation(() => User)
  async update_user(
    @Arg("membership_id", () => String) membership_id: string,
    @Arg("name", () => String, { nullable: true }) name: string | undefined,
    @Arg("email", () => String, { nullable: true }) email: string | undefined,
    @Arg("nb_strikes", () => Int, { nullable: true })
    nb_strikes: number | undefined,
    @Arg("role", () => Role, { nullable: true }) role: Role | undefined
  ): Promise<User> {
    const user = await User.findOne({ where: { membership_id } });

    if (!user) throw "User don't exist";

    if (name) user.name = name;
    if (email) user.email = email;
    if (nb_strikes) user.nb_strikes = nb_strikes;
    if (role) user.role = role;

    return await user.save();
  }

  @Mutation(() => User)
  async set_password(
    @Arg("membership_id", () => String) membership_id: string,
    @Arg("email", () => String) email: string,
    @Arg("password", () => String) password: string
  ): Promise<User> {
    const user = await User.findOne({ where: { email, membership_id } });

    if (!user) throw "Wrong email or membership_id";

    user.set_password(password);

    return await user.save();
  }

  @Mutation(() => User)
  async login(
    @Arg("email", () => String) email: string,
    @Arg("password", () => String) password: string,
    @Ctx() { authenticate, login }: Context<User>
  ): Promise<User> {
    const { user, info } = await authenticate("graphql-local", {
      email,
      password,
    });

    if (!user) throw info;

    await login(user);

    return user;
  }
}
