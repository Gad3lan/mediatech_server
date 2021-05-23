import { Field, Int, ObjectType, registerEnumType } from "type-graphql";
import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Rental } from "./Rental";
import { pbkdf2 } from "crypto";

const SALT = "4gAt*fYW^=r2#LrQ4R!rAVzNnek3ucW4";

export enum Role {
  not_connected = "not_connected",
  connected = "connected",
  manager = "manager",
  admin = "admin",
}
registerEnumType(Role, { name: "Role" });

@Entity("user")
@ObjectType("User")
export class User extends BaseEntity {
  // membership_id: string, pk
  // name: string, NOT NULL
  // email : string, NOT NULL
  // password_hash : string,
  // nb_strikes : int, check(0 <= nb_strikes <= 3), NOT NULL, default 0
  // nb_rentals : int, check(0 <= nb_rentals <= 10), NOT NULL, default 0
  // roles: type enum[not_connected, connected, manager, admin], NOT NULL, default not_connected

  @Field()
  @PrimaryColumn({ name: "membership_id" })
  membership_id!: string;

  @Field(() => [Rental], { nullable: true })
  @OneToMany(() => Rental, (rental) => rental.user)
  rentals?: Promise<Rental[]>;

  @Field()
  @Column({ name: "name" })
  name!: string;

  @Field()
  @Column({ name: "email" })
  email!: string;

  @Column({ name: "password_hash" })
  password_hash?: string;

  @Field(() => Int)
  @Column({ name: "nb_strikes", type: "int", default: 0 })
  nb_strikes!: number;

  static NB_MAX_STRIKES = 3;

  @Field(() => Int)
  @Column({ name: "nb_rentals", type: "int", default: 0 })
  nb_rentals!: number;

  static NB_MAX_RENTALS = 10;

  @Field(() => Role)
  @Column({
    name: "role",
    type: "enum",
    enum: Role,
    default: Role.not_connected,
  })
  role!: Role;

  hash(password: string): Promise<string> {
    return new Promise((done, reject) =>
      pbkdf2(password, SALT, 100000, 64, "sha512", (err, res) => {
        if (err) reject(err);
        done(res.toString());
      })
    );
  }

  async set_password(password: string): Promise<void> {
    this.password_hash = await this.hash(password);
  }

  async validate_pasword(password: string): Promise<boolean> {
    return this.password_hash === (await this.hash(password));
  }
}
