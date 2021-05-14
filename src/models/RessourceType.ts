import { Field, ObjectType } from "type-graphql";
import { Entity, PrimaryColumn } from "typeorm";

@Entity()
@ObjectType("RessourceType")
export class RessourceType {
  // type: string pk

  @Field()
  @PrimaryColumn()
  type!: string;
}
