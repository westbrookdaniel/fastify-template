import Fastify from "fastify";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import { Type } from "@sinclair/typebox";
import type { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";

const app = Fastify({
  logger:
    process.env.NODE_ENV === "test"
      ? false
      : process.env.NODE_ENV === "production"
        ? true
        : { transport: { target: "pino-pretty" } },
}).withTypeProvider<TypeBoxTypeProvider>();

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
        default: Type.Object({
          message: Type.String(),
        }),
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
