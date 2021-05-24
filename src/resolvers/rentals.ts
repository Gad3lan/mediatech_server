import { Context } from "graphql-passport/lib/buildContext";
import { Resolver, Query, Ctx, Mutation, Arg } from "type-graphql";
import { Rental, State } from "../models/Rental";
import { Ressource } from "../models/Ressource";
import { Role, User } from "../models/User";
import { Guard } from "./guard";

@Resolver(Rental)
export class RentalResolver {
  @Query(() => [Rental])
  async rentals(@Ctx() ctx: Context<User>): Promise<Rental[]> {
    new Guard(Role.manager, ctx);

    return Rental.find();
  }

  @Mutation(() => Rental)
  async borrow_ressource(
    @Arg("cote", () => String) cote: string,
    @Ctx() ctx: Context<User>
  ): Promise<Rental> {
    new Guard(Role.connected, ctx);

    const user = ctx.getUser();

    if (user.nb_rentals >= User.NB_MAX_RENTALS) throw "Too much rentals";

    if (user.nb_strikes >= User.NB_MAX_STRIKES) throw "Too much strikes";

    const ressource = await Ressource.findOne({ where: { cote } });

    if (!ressource) throw "Ressource don't exist";

    const rental = new Rental();

    rental.user = user;
    rental.ressource = ressource;
    rental.initial_date = new Date();
    rental.return_date = new Date();
    rental.return_date.setDate(rental.return_date.getDate() + 7);
    rental.initial_state = State.good;
    rental.returned = false;

    await rental.save();

    ++user.nb_rentals;
    user.save();

    return rental;
  }
}
