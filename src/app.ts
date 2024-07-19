import Fastify from "fastify";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";

const app = Fastify({
  logger:
    process.env.NODE_ENV === "test"
      ? false
      : process.env.NODE_ENV === "production"
        ? true
        : { transport: { target: "pino-pretty" } },
});

await app.register(swagger, {
  openapi: {
    openapi: "3.0.0",
    info: {
      title: "My App",
      description: "Made with Fastify",
      version: "0.1.0",
    },
  },
});

app.get(
  "/",
  {
    schema: {
      description: "Hello World",
      tags: ["index"],
      response: {
        default: {
          type: "object",
          properties: {
            message: { type: "string" },
          },
        },
      },
    },
  },
  (_req, reply) => {
    reply.send({ message: "hello world" });
  },
);

await app.register(swaggerUi, {
  routePrefix: "/documentation",
});

export default app;
