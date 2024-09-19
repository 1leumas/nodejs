import fastify from "fastify";
import { usersRoutes } from "./http/controllers/users/routes";
import { gymsRoutes } from "./http/controllers/gyms/routes";
import { env } from "./env";
import { ZodError } from "zod";
import fastifyJwt from "@fastify/jwt";
import { checkInRoutes } from "./http/controllers/check-in/routes";

export const app = fastify();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
});

app.register(checkInRoutes);
app.register(gymsRoutes);
app.register(usersRoutes);

app.setErrorHandler((error, request, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: "Validation Error", details: error.format() });
  }

  if (env.NODE_ENV !== "production") {
    console.error(error);
  }

  return reply.status(500).send({ message: "Internal server error" });
});
