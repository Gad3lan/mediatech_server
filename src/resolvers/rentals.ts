import { Resolver, Query } from "type-graphql";
import { Rental } from "../models/Rental";

@Resolver(Rental)
export class RentalResolver {
  @Query(() => [Rental])
  async rentals(): Promise<Rental[]> {
    return Rental.find();
  }
}
