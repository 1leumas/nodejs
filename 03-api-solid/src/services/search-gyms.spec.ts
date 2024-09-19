import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { SearchGymsService } from "./search-gyms-service";

let gymsRepository: InMemoryGymsRepository;
let sut: SearchGymsService;

describe("Search Gyms Service", () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new SearchGymsService(gymsRepository);
  });

  it("should be able to search many gyms", async () => {
    // generate 2 gyms
    await gymsRepository.create(
      "gym-01",
      "JavaScript Gym",
      "",
      "",
      -27.2092052,
      -49.6401091
    );

    await gymsRepository.create(
      "gym-02",
      "Typescript Gym",
      "",
      "",
      -27.2092052,
      -49.6401091
    );

    const { gyms } = await sut.execute("Typescript", 1);

    expect(gyms).toHaveLength(1);
  });

  it("should be able to fetch paginated gym search", async () => {
    // mock data
    for (let i = 0; i < 22; i++) {
      await gymsRepository.create(
        `gym-${i}`,
        `gym-${i}`,
        "",
        "",
        -27.2092052,
        -49.6401091
      );
    }

    const { gyms } = await sut.execute("gym", 2);

    expect(gyms).toHaveLength(2);
  });
});
