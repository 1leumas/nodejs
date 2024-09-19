import { CheckInInterface } from "@/repositories/checkin-interface";
import { CheckIn } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import dayjs from "dayjs";

export class ValidateCheckInService {
  constructor(private checkInsRepository: CheckInInterface) {}

  async execute(checkInId: string): Promise<CheckIn> {
    const checkIn = await this.checkInsRepository.findById(checkInId);

    if (!checkIn) {
      throw new ResourceNotFoundError();
    }

    const distanceInMinutesFromCheckInCreation = dayjs().diff(
      dayjs(checkIn.created_at),
      "minute"
    );

    if (distanceInMinutesFromCheckInCreation > 20) {
      throw new Error("Check-in is too old to be validated");
    }

    checkIn.validated_at = new Date();

    this.checkInsRepository.save(checkIn);

    return checkIn;
  }
}
