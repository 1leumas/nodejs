import { InMemoryCheckInRepository } from "@/repositories/in-memory/in-memory-check-in-repository";
import { expect, describe, it, beforeEach, afterEach, vi } from "vitest";
import { ValidateCheckInService } from "./validate-check-in-service";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

let checkInsRepository: InMemoryCheckInRepository;
let sut: ValidateCheckInService;

describe("Validate Check In Service", () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInRepository();
    sut = new ValidateCheckInService(checkInsRepository);

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be able to validate a check in", async () => {
    const checkIn = await checkInsRepository.create({
      gym_id: "gym-01",
      user_id: "user-01",
    });

    const isValid = await sut.execute(checkIn.id);

    expect(isValid.validated_at).toBeInstanceOf(Date);
    expect(checkInsRepository.items[0].validated_at).toBeInstanceOf(Date);
  });

  it("should not be able to validate an inexistent check in", async () => {
    await expect(sut.execute("non-existent-id")).rejects.toBeInstanceOf(
      ResourceNotFoundError
    );
  });

  it("should only be able to validate a check in 20 minutes after it was created", async () => {
    vi.setSystemTime(new Date("2021-01-01T12:00:00Z"));

    const checkIn = await checkInsRepository.create({
      gym_id: "gym-01",
      user_id: "user-01",
    });

    const MINUTES = 21;
    vi.advanceTimersByTime(MINUTES * 60 * 1000);

    await expect(sut.execute(checkIn.id)).rejects.toBeInstanceOf(Error);
  });
});
