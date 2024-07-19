import Fastify from "fastify";

const app = Fastify({
  logger:
    process.env.NODE_ENV === "test"
      ? false
      : process.env.NODE_ENV === "production"
        ? true
        : { transport: { target: "pino-pretty" } },
});

app.get("/", function (_req, reply) {
  reply.send({ hello: "world" });
});

export default app;
