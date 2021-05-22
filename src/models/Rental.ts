import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";

import { Ressource } from "./Ressource";
import { User } from "./User";

export enum State {
  good = 0,
  medium = 1,
  bad = 2,
}

@Entity("rental")
@ObjectType("Rental")
export class Rental extends BaseEntity {
  // rtl_id : int pk
  // membership_id : string, fk user, NOT NULL
  // cote : string, fk ressource, NOT NULL
  // initial_date : date, NOT NULL
  // return_date : date, NOT NULL
  // initial_state : type enum[good, medium, bad], NOT NULL
  // return_state : type enum[good, medium, bad]
  // returned : bool, NOT NULL, default false
  // check(initial_date < return_date)

  @PrimaryColumn({ name: "rtl_id", type: "int" })
  rtl_id!: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.rentals)
  @JoinColumn({ name: "membership_id" })
  user!: User;

  @Field()
  @ManyToOne(() => Ressource, (ressource) => ressource.rentals)
  @JoinColumn({ name: "cote" })
  ressource!: Ressource;

  @Field()
  @Column({ name: "initial_date" })
  initial_date!: Date;

  @Field()
  @Column({ name: "return_date" })
  return_date!: Date;

  @Field(() => Int)
  @Column({ name: "initial_state", type: "int" })
  initial_state!: State;

  @Field(() => Int)
  @Column({ name: "return_state", type: "int" })
  return_state?: State;

  @Field()
  @Column({ name: "returned", default: false })
  returned!: boolean;
}
