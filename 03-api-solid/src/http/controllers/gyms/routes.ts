import { FastifyInstance } from "fastify";
import { verifyJwt } from "../../middlewares/verify-jwt";
import { search } from "./search-controller";
import { nearby } from "./nearby-controller";
import { create } from "./create-controller";

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook("preHandler", verifyJwt());
  //- Authenticated routes
  app.get("/gyms/search", search);
  app.get("/gyms/nearby", nearby);
  app.get("/gyms", create);
}
