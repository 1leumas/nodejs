import { Gym } from "@prisma/client";
import { GymsInterface } from "@/repositories/gyms-interface";

export class CreateGymService {
  constructor(private gymRepository: GymsInterface) {}

  async execute(
    title: string,
    description: string | null,
    phone: string | null,
    latitude: number,
    longitude: number
  ): Promise<{ gym: Gym }> {
    const gym = await this.gymRepository.create(
      null,
      title,
      description,
      phone,
      latitude,
      longitude
    );
    return { gym };
  }
}
