import { FastifyInstance } from "fastify";
import request from "supertest";

export async function createAndAuthUser(app: FastifyInstance) {
  await request(app.server).post("/users").send({
    name: "John Doe",
    email: "johndoe@example.com",
    password: "password",
  });

  const response = await request(app.server).post("/sessions").send({
    email: "johndoe@example.com",
    password: "password",
  });

  const { token } = response.body;
  return token;
}
