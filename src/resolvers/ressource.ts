import { Context } from "graphql-passport/lib/buildContext";
import { Resolver, Query, Arg, Int, Mutation, Ctx } from "type-graphql";
import { Ressource } from "../models/Ressource";
import { Role, User } from "../models/User";
import { Guard } from "./guard";

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
    quantity: number | undefined
    // @Arg("disponibility", () => Boolean, { nullable: true })
    // disponibility: boolean | undefined
  ): Promise<Ressource[]> {
    const where: any = {};

    if (type) where.type = type;
    if (title) where.title = title;
    if (author) where.author = author;
    if (editor) where.editor = editor;
    if (edition_date) where.edition_date = edition_date;
    if (genre) where.genre = genre;
    if (quantity) where.quantity = quantity;

    return Ressource.find({ where });
  }

  @Mutation(() => Ressource)
  async update_ressource(
    @Arg("type", () => String, { nullable: true }) type: string | undefined,
    @Arg("title", () => String, { nullable: true }) title: string | undefined,
    @Arg("author", () => String, { nullable: true }) author: string | undefined,
    @Arg("editor", () => String, { nullable: true }) editor: string | undefined,
    @Arg("edition_date", () => Date, { nullable: true })
    edition_date: Date | undefined,
    @Arg("genre", () => String, { nullable: true }) genre: string | undefined,
    @Arg("cote", () => String) cote: string | undefined,
    @Arg("quantity", () => Int, { nullable: true })
    quantity: number | undefined,
    @Ctx() ctx: Context<User>
  ) {
    new Guard(Role.manager, ctx);

    const ressource = await Ressource.findOne({ where: { cote } });

    if (!ressource) throw "Ressource don't exist !";

    if (type) ressource.type.type = type;
    if (title) ressource.title = title;
    if (author) ressource.author = author;
    if (editor) ressource.editor = editor;
    if (edition_date) ressource.edition_date = edition_date;
    if (genre) ressource.genre.genre = genre;
    if (quantity) ressource.quantity = quantity;

    return ressource.save();
  }
}
