import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from "typeorm";

import { RessourceType } from "./RessourceType";
import { RessourceGenre } from "./RessourceGenre";
import { Rental } from "./Rental";

@Entity("ressource")
@ObjectType("Ressource")
export class Ressource extends BaseEntity {
  // cote : string, pk
  // type : string fk ressource_type, NOT NULL
  // genre : string fk ressource_genre, NOT NULL
  // title : string, NOT NULL
  // author : string, NOT NULL
  // editor : string, NOT NULL
  // edition_date : date, NOT NULL
  // quantity : int, NOT NULL
  // cover : string, NOT NULL
  // resume : string, NOT NULL

  @Field()
  @PrimaryColumn({ name: "cote" })
  cote!: string;

  @Field(() => [Rental], { nullable: true })
  @OneToMany(() => Rental, (rental) => rental.ressource)
  rentals?: Promise<Rental[]>;

  @Field(() => RessourceType)
  @ManyToOne(() => RessourceType, (type) => type.ressources)
  @JoinColumn({ name: "type" })
  type!: Promise<RessourceType>;

  @Field(() => RessourceGenre)
  @ManyToOne(() => RessourceGenre, (genre) => genre.ressources)
  @JoinColumn({ name: "genre" })
  genre!: Promise<RessourceGenre>;

  @Field()
  @Column({ name: "title" })
  title!: string;

  @Field()
  @Column({ name: "author" })
  author!: string;

  @Field()
  @Column({ name: "editor" })
  editor!: string;

  @Field()
  @Column({ name: "edition_date" })
  edition_date!: Date;

  @Field(() => Int)
  @Column({ name: "quantity", type: "int" })
  quantity!: number;

  @Field()
  @Column({ name: "cover" })
  cover!: string;

  @Field()
  @Column({ name: "resume" })
  resume!: string;

  // @Field(() => Boolean)
  // disponibility!: boolean;
}
