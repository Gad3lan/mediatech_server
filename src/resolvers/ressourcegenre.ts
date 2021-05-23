import { Arg, Query, Resolver } from "type-graphql";
import { RessourceGenre } from "../models/RessourceGenre";

@Resolver(RessourceGenre)
export class RessourceGenreResolver {
  @Query(() => [RessourceGenre])
  async ressource_genre(
    @Arg("genre", () => String, { nullable: true }) genre: string | undefined
  ): Promise<RessourceGenre[]> {
    const where: any = {};

    if (genre) where.genre = genre;

    return RessourceGenre.find({ where });
  }
}
