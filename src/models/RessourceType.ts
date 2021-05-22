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

  @Field(() => [Ressource])
  @OneToMany(() => Ressource, (ressource) => ressource.type)
  ressources?: Ressource[];
}
