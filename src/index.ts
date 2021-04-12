import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/user";
import { createConnection } from "typeorm";

const main = async () => {
  await createConnection({
    type: "postgres",
    username:"test",
    password: "test",
    logging: true,
    synchronize: true,
    entities: [],
  });

  const app = express();

  const apollo_server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver],
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
