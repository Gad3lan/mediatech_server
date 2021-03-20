import { ObjectType, Field, Int } from "type-graphql";

@ObjectType("User")
export class User {
  @Field((type) => Int)
  id!: number;

  @Field((type) => String)
  name!: string;
}
