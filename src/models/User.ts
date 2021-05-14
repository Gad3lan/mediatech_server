import { Field, ObjectType } from "type-graphql";
import { Column, Entity, PrimaryColumn } from "typeorm";

export enum Role {
  not_connected = 0,
  connected = 1,
  manager = 2,
  admin = 3,
}

@Entity()
@ObjectType("User")
export class User {
  // membership_id: string, pk
  // email : string, NOT NULL
  // password_hash : string,
  // nb_strikes : int, check(0 <= nb_strikes <= 3), NOT NULL, default 0
  // nb_rentals : int, check(0 <= nb_rentals <= 10), NOT NULL, default 0
  // roles: type enum[not_connected, connected, manager, admin], NOT NULL, default not_connected

  @PrimaryColumn()
  membership_id!: string;

  @Field()
  @Column()
  email!: string;

  @Column()
  password_hash!: string;

  @Field()
  @Column()
  nb_strikes!: number;

  @Field()
  @Column()
  nb_rentals!: number;

  @Field()
  @Column()
  roles!: Role;
}
