import { expect, test } from "vitest";
import app from "../src/app";

test("/", async () => {
  const res = await app.inject({
    method: "GET",
    url: "/",
  });

  expect(res.statusCode).toBe(200);
  expect(res.body).toBe(JSON.stringify({ hello: "world" }));
});
