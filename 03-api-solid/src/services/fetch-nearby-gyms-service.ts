import { Gym } from "@prisma/client";
import { GymsInterface } from "@/repositories/gyms-interface";

export class FetchNearbyGymsService {
  constructor(private gymRepository: GymsInterface) {}

  async execute(
    userLatitude: number,
    userLongitude: number
  ): Promise<{ gyms: Gym[] }> {
    const gyms = await this.gymRepository.findManyNearby(
      userLatitude,
      userLongitude
    );
    return { gyms };
  }
}
