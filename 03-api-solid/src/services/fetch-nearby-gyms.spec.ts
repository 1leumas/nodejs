import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { FetchNearbyGymsService } from "./fetch-nearby-gyms-service";

let gymsRepository: InMemoryGymsRepository;
let sut: FetchNearbyGymsService;

describe("Fetch Nearby Gyms Service", () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new FetchNearbyGymsService(gymsRepository);
  });

  it("should be able to fetch nearby gyms", async () => {
    // generate 2 gyms
    await gymsRepository.create(
      "gym-01",
      "Near Gym",
      "",
      "",
      -27.2092052,
      -49.6401091
    );

    await gymsRepository.create(
      "gym-02",
      "Far Away Gym",
      "",
      "",
      -27.0610928,
      -49.5229501
    );

    const { gyms } = await sut.execute(-27.2092052, -49.6401091);

    expect(gyms).toHaveLength(1);
  });
});
