import "./type";
import "reflect-metadata";
import "dotenv-safe/config";
import express from "express";
import session from "express-session";
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
import { buildContext, GraphQLLocalStrategy } from "graphql-passport";
import passport from "passport";
import { RessourceGenreResolver } from "./resolvers/ressourcegenre";
import { RessourceTypeResolver } from "./resolvers/ressourcetype";

const main = async () => {
  await createConnection({
    type: "postgres",
    url: process.env.DATABASE_URL,
    logging: true,
    entities: [Rental, Ressource, RessourceGenre, RessourceType, User],
  });

  passport.use(
    new GraphQLLocalStrategy(
      async (
        email: unknown,
        password: unknown,
        done: (error: any, user?: User) => void
      ) => {
        if (typeof email !== "string" || typeof password !== "string")
          return done("You must provide email and password");

        const user = await User.findOne({ where: { email } });

        if (!user) return done("Email doesen't exist");

        if (!(await user.validate_pasword(password)))
          return done("Wrong password");

        return done(null, user);
      }
    )
  );

  passport.serializeUser((user: User, done) => {
    return done(null, user.membership_id);
  });

  passport.deserializeUser(async (membership_id: string, done) => {
    const user = await User.findOne({ where: { membership_id } });

    if (!user) return done("User don't exist");

    return done(null, user);
  });

  const app = express();

  app.use(
    session({
      name: "mediatech_server_cookie",
      secret: "=+c2UXS=AZ-v4jBe3^^w!36!Rg+qvPfx",
      resave: true,
      saveUninitialized: false,
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  const apollo_server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        RentalResolver,
        RessourceResolver,
        RessourceGenreResolver,
        RessourceTypeResolver,
        UserResolver,
      ],
    }),
    context: ({ req, res }) => buildContext({ req, res }),
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
