import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Ressource } from "./Ressource";

@Entity("ressource_type")
@ObjectType("RessourceType")
export class RessourceType extends BaseEntity {
  // type: string pk

  @Field()
  @PrimaryColumn({ name: "type" })
  type!: string;

  @Field(() => [Ressource], { nullable: true })
  @OneToMany(() => Ressource, (ressource) => ressource.type, { lazy: true })
  ressources!: Ressource[];
}
