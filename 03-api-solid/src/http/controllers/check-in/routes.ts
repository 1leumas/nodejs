import { FastifyInstance } from "fastify";
import { verifyJwt } from "../../middlewares/verify-jwt";
import { create } from "./create-controller";
import { validate } from "./validate-controller";
import { history } from "./history-controller";
import { metrics } from "./metrics-controller";

export async function checkInRoutes(app: FastifyInstance) {
  app.addHook("preHandler", verifyJwt());
  //- Authenticated routes

  app.get("/check-in/metrics", metrics);
  app.get("/check-in/history", history);
  app.post("/gyms/:gymId/check-in", create);
  app.patch("/check-in/:checkInId/validate", validate);
}
