import { Field, Int, ObjectType, registerEnumType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { Ressource } from "./Ressource";
import { User } from "./User";

export enum State {
  good = "good",
  medium = "medium",
  bad = "bad",
}
registerEnumType(State, { name: "State" });

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

  @Field(() => Int)
  @PrimaryGeneratedColumn("increment", { name: "rtl_id", type: "int" })
  rtl_id!: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.rentals, { lazy: true })
  @JoinColumn({ name: "membership_id" })
  user!: User;

  @Field(() => Ressource)
  @ManyToOne(() => Ressource, (ressource) => ressource.rentals, { lazy: true })
  @JoinColumn({ name: "cote" })
  ressource!: Ressource;

  @Field()
  @Column({ name: "initial_date" })
  initial_date!: Date;

  @Field()
  @Column({ name: "return_date" })
  return_date!: Date;

  @Field(() => State)
  @Column({ name: "initial_state", type: "enum", enum: State })
  initial_state!: State;

  @Field(() => State, { nullable: true })
  @Column({ name: "return_state", type: "enum", enum: State })
  return_state?: State;

  @Field()
  @Column({ name: "returned", default: false })
  returned!: boolean;
}
