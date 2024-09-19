import { FastifyReply, FastifyRequest } from "fastify";

export function verifyJwt() {
  return async function (request: FastifyRequest, reply: FastifyReply) {
    try {
      await request.jwtVerify();
    } catch (error) {
      reply.code(401).send({ message: "Unauthorized" });
    }
  };
}
