import request from "supertest";
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createAndAuthUser } from "@/utils/test/create-and-auth-user";

describe("Create Gym (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to create a gym", async () => {
    const { token } = await createAndAuthUser(app);

    const response = await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Academia do Zé",
        description: "Academia do Zé, a melhor academia do bairro",
        phone: "123456789",
        latitude: -27.2092052,
        longitude: -49.6401091,
      });

    expect(response.status).toBe(201);
  });
});
