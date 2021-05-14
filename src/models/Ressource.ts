import { Field, ObjectType } from "type-graphql";
import { Column, Entity, ManyToMany, ManyToOne, PrimaryColumn } from "typeorm";

import { RessourceType } from "./RessourceType";
import { RessourceGenre } from "./RessourceGenre";

@Entity()
@ObjectType("Ressource")
export class Ressource {
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
  @PrimaryColumn()
  cote!: string;

  @Field()
  @ManyToMany(() => RessourceType, (type) => type.type)
  type!: RessourceType;

  @Field()
  @ManyToOne(() => RessourceGenre, (genre) => genre.genre)
  genre!: RessourceGenre;

  @Field()
  @Column()
  title!: string;

  @Field()
  @Column()
  author!: string;

  @Field()
  @Column()
  editor!: string;

  @Field()
  @Column()
  edition_date!: Date;

  @Field()
  @Column()
  quantity!: number;

  @Field()
  @Column()
  cover!: string;

  @Field()
  @Column()
  resume!: string;
}
