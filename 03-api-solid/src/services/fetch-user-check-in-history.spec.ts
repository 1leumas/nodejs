import { InMemoryCheckInRepository } from "@/repositories/in-memory/in-memory-check-in-repository";
import { expect, describe, it, beforeEach } from "vitest";
import { FetchUserCheckInHistoryService } from "./fetch-user-check-in-history-service";

let checkInsRepository: InMemoryCheckInRepository;
let sut: FetchUserCheckInHistoryService;

describe("Fetch User Check In Service", () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInRepository();
    sut = new FetchUserCheckInHistoryService(checkInsRepository);
  });

  it("should be able to fetch check in history", async () => {
    // generate many check ins
    for (let i = 0; i < 10; i++) {
      await checkInsRepository.create({
        gym_id: `gym-${i}`,
        user_id: "user-01",
      });
    }

    const { checkIns } = await sut.execute({
      userId: "user-01",
      page: 1,
    });

    expect(checkIns).toHaveLength(10);
  });

  it("should be able to fetch paginated check-in history", async () => {
    // generate many check ins
    for (let i = 0; i < 22; i++) {
      await checkInsRepository.create({
        gym_id: `gym-${i}`,
        user_id: "user-01",
      });
    }

    const { checkIns } = await sut.execute({
      userId: "user-01",
      page: 2,
    });

    expect(checkIns).toHaveLength(2);
  });
});
