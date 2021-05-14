import { Resolver, Query } from "type-graphql";
import { Ressource } from "../models/Ressource";

@Resolver(Ressource)
export class RessourceResolver {
  @Query(() => [Ressource])
  async ressources(): Promise<Ressource[]> {
    return Ressource.find();
  }
}
