import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Entity, PrimaryColumn } from "typeorm";

@Entity()
@ObjectType("RessourceGenre")
export class RessourceGenre extends BaseEntity {
  // genre : string pk

  @Field()
  @PrimaryColumn()
  genre!: string;
}
