import app from "./app";

try {
  await app.listen({
    port: parseInt(process.env.PORT || "3000"),
    host: "0.0.0.0",
  });
} catch (err) {
  app.log.error(err);
  process.exit(1);
}
