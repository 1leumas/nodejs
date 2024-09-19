import { GymsInterface } from "@/repositories/gyms-interface";
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordinates";
import { Gym } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import { randomUUID } from "crypto";

export class InMemoryGymsRepository implements GymsInterface {
  public items: Gym[] = [];

  async findById(id: string) {
    const gym = this.items.find((item) => item.id === id);

    if (!gym) {
      return null;
    }

    return gym;
  }

  async create(
    id: string | null,
    title: string,
    description: string | null,
    phone: string | null,
    latitude: number,
    longitude: number
  ) {
    const gym = {
      id: id ?? randomUUID(),
      title,
      description,
      phone,
      latitude: new Decimal(latitude.toString()),
      longitude: new Decimal(longitude.toString()),
      created_at: new Date(),
    };

    this.items.push(gym);

    return gym;
  }

  async searchManyByTitle(query: string, page: number) {
    return this.items
      .filter((gym) => gym.title.includes(query))
      .slice((page - 1) * 20, page * 20);
  }

  async findManyNearby(latitude: number, longitude: number) {
    return this.items.filter((gym) => {
      const distance = getDistanceBetweenCoordinates(
        { latitude, longitude },
        {
          latitude: gym.latitude.toNumber(),
          longitude: gym.longitude.toNumber(),
        }
      );

      const MAX_DISTANCE_IN_KILOMETERS = 10;
      return distance <= MAX_DISTANCE_IN_KILOMETERS;
    });
  }
}
