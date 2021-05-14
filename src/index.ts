import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/user";
import { createConnection } from "typeorm";
import { Rental } from "./models/Rental";
import { Ressource } from "./models/Ressource";
import { RessourceGenre } from "./models/RessourceGenre";
import { RessourceType } from "./models/RessourceType";
import { User } from "./models/User";
import { RessourceResolver } from "./resolvers/ressource";
import { RentalResolver } from "./resolvers/rentals";

const test_db = async () => {
  const user = User.create({
    membership_id: "testid",
    email: "test@sweg.com",
  });
  await user.save();
};

const main = async () => {
  await createConnection({
    type: "postgres",
    username: "test",
    password: "test",
    logging: true,
    synchronize: true,
    entities: [Rental, Ressource, RessourceGenre, RessourceType, User],
  });

  await test_db();

  const app = express();

  const apollo_server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [RentalResolver, RessourceResolver, UserResolver],
    }),
    context: ({ req, res }) => ({ req, res }),
    playground: true,
  });

  apollo_server.applyMiddleware({ app });

  app.listen(8080, () => {
    console.log("server started on http://localhost:8080/graphql");
  });
};

process.on("SIGINT", () => process.exit(1));

main().catch((err) => {
  console.log(err);
});
