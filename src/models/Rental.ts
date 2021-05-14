import { Field, ObjectType } from "type-graphql";
import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Ressource } from "./Ressource";
import { User } from "./User";

export enum State {
  good = 0,
  medium = 1,
  bad = 2,
}

@Entity()
@ObjectType("Rental")
export class Rental {
  // rtl_id : int pk
  // membership_id : string, fk user, NOT NULL
  // cote : string, fk ressource, NOT NULL
  // initial_date : date, NOT NULL
  // return_date : date, NOT NULL
  // initial_state : type enum[good, medium, bad], NOT NULL
  // return_state : type enum[good, medium, bad]
  // returned : bool, NOT NULL, default false
  // check(initial_date < return_date)

  @PrimaryColumn()
  rtl_id!: number;

  @Field()
  @ManyToOne(() => User, (user) => user.membership_id)
  membership_id!: User;

  @Field()
  @ManyToOne(() => Ressource, (ressource) => ressource.cote)
  cote!: Ressource;

  @Field()
  @Column()
  initial_date!: Date;

  @Field()
  @Column()
  return_date!: Date;

  @Field()
  @Column()
  initial_state!: State;

  @Field()
  @Column()
  return_state?: State;

  @Field()
  @Column()
  returned!: boolean;
}
