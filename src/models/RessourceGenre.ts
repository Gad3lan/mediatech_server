import { Field, ObjectType } from "type-graphql";
import { Entity, PrimaryColumn } from "typeorm";

@Entity()
@ObjectType("RessourceGenre")
export class RessourceGenre {
  // genre : string pk

  @Field()
  @PrimaryColumn()
  genre!: string;
}
