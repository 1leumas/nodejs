import { Gym } from "@prisma/client";
import { GymsInterface } from "@/repositories/gyms-interface";

export class SearchGymsService {
  constructor(private gymRepository: GymsInterface) {}

  async execute(query: string, page: number): Promise<{ gyms: Gym[] }> {
    const gyms = await this.gymRepository.searchManyByTitle(query, page);
    return { gyms };
  }
}
