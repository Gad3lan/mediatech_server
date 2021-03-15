import express from "express";

const main = async () => {
  const app = express();

  app.get("*", (_req, res) => {
    res.send("Hello world !");
  });

  app.listen(80, () => {
    console.log("server started on port 80");
  });
};

process.on("SIGINT", () => process.exit(1));

main().catch((err) => {
  console.log(err);
});
