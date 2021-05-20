import { Resolver, Query, Arg, Int } from "type-graphql";
import { Ressource } from "../models/Ressource";

@Resolver(Ressource)
export class RessourceResolver {
  @Query(() => [Ressource])
  async ressource(
    @Arg("type", () => String, { nullable: true }) type: string | undefined,
    @Arg("title", () => String, { nullable: true }) title: string | undefined,
    @Arg("author", () => String, { nullable: true }) author: string | undefined,
    @Arg("editor", () => String, { nullable: true }) editor: string | undefined,
    @Arg("edition_date", () => Date, { nullable: true })
    edition_date: Date | undefined,
    @Arg("genre", () => String, { nullable: true }) genre: string | undefined,
    @Arg("cote", () => String, { nullable: true }) cote: string | undefined,
    @Arg("quantity", () => Int, { nullable: true })
    quantity: number | undefined,
    @Arg("disponibility", () => Boolean, { nullable: true })
    disponibility: boolean | undefined
  ): Promise<Ressource[]> {
    return Ressource.find({
      where: {
        type,
        title,
        author,
        editor,
        edition_date,
        genre,
        cote,
        quantity,
      },
    });
  }
}
