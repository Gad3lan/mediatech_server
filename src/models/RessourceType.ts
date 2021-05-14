import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Entity, PrimaryColumn } from "typeorm";

@Entity()
@ObjectType("RessourceType")
export class RessourceType extends BaseEntity {
  // type: string pk

  @Field()
  @PrimaryColumn()
  type!: string;
}
