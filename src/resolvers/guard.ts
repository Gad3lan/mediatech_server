import { Context } from "graphql-passport/lib/buildContext";
import { Role, User } from "../models/User";

const role_values = new Map<Role, number>([
  [Role.not_connected, 0],
  [Role.connected, 1],
  [Role.manager, 2],
  [Role.admin, 3],
]);

export class Guard {
  constructor(role: Role, ctx: Context<User>) {
    if (!ctx.isAuthenticated()) throw "You must be connected";

    const user = ctx.getUser();

    if (
      (role_values.get(role) as number) > (role_values.get(user.role) as number)
    )
      throw "You don't have permition to do that";
  }
}
