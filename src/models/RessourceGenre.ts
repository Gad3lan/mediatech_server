import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Ressource } from "./Ressource";

@Entity("ressource_genre")
@ObjectType("RessourceGenre")
export class RessourceGenre extends BaseEntity {
  // genre : string pk

  @Field()
  @PrimaryColumn({ name: "genre" })
  genre!: string;

  @Field(() => [Ressource], { nullable: true })
  @OneToMany(() => Ressource, (ressource) => ressource.genre)
  ressources?: Ressource[];
}
