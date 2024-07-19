import app from "./app";

try {
  await app.listen({
    port: parseInt(process.env.PORT || "3000"),
  });
} catch (err) {
  app.log.error(err);
  process.exit(1);
}
