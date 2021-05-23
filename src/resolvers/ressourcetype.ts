import { Arg, Query, Resolver } from "type-graphql";
import { RessourceType } from "../models/RessourceType";

@Resolver(RessourceType)
export class RessourceTypeResolver {
  @Query(() => [RessourceType])
  async ressource_type(
    @Arg("type", () => String, { nullable: true }) type: string | undefined
  ): Promise<RessourceType[]> {
    const where: any = {};

    if (type) where.type = type;

    return RessourceType.find({ where });
  }
}
