import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { CreateGymService } from "./create-gym-service";

let repo: InMemoryGymsRepository;
let gymService: CreateGymService;

const title = "JavaScript Gym";
const description = "";
const phone = "";
const latitude = -27.2092052;
const longitude = -49.6401091;

describe("Register Service", () => {
  beforeEach(() => {
    repo = new InMemoryGymsRepository();
    gymService = new CreateGymService(repo);
  });

  it("should be able to create a gym", async () => {
    // Act
    const createdGym = await gymService.execute(
      title,
      description,
      phone,
      latitude,
      longitude
    );

    // Assert
    const gym = await repo.findById(createdGym.gym.id);
    expect(gym).toBeDefined();
  });
});
