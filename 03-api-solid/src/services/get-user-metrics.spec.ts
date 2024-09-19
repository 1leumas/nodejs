import { InMemoryCheckInRepository } from "@/repositories/in-memory/in-memory-check-in-repository";
import { expect, describe, it, beforeEach } from "vitest";
import { GetUserMetricsService } from "./get-user-metrics-service";

let checkInsRepository: InMemoryCheckInRepository;
let sut: GetUserMetricsService;

describe("Get User Metrics Service", () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInRepository();
    sut = new GetUserMetricsService(checkInsRepository);
  });

  it("should be able to get how many times user checked in", async () => {
    // generate mock check ins data
    for (let i = 0; i < 10; i++) {
      await checkInsRepository.create({
        gym_id: `gym-${i}`,
        user_id: "user-01",
      });
    }

    const { checkInsCount } = await sut.execute({
      userId: "user-01",
    });

    expect(checkInsCount).toBe(10);
  });
});
