import { prisma } from "@/lib/prisma";
import { GymsInterface } from "../gyms-interface";
import { Gym } from "@prisma/client";

export class PrismaGymsRepository implements GymsInterface {
  async findById(id: string) {
    const gym = await prisma.gym.findUnique({
      where: {
        id,
      },
    });
    return gym;
  }

  async create(
    id: string | undefined,
    title: string,
    description: string | null,
    phone: string | null,
    latitude: number,
    longitude: number
  ) {
    const gym = await prisma.gym.create({
      data: {
        id,
        title,
        description,
        phone,
        latitude,
        longitude,
      },
    });
    return gym;
  }

  async searchManyByTitle(query: string, page: number) {
    const gyms = await prisma.gym.findMany({
      where: {
        title: {
          contains: query,
        },
      },
      skip: (page - 1) * 20,
      take: 20,
    });
    return gyms;
  }

  async findManyNearby(latitude: number, longitude: number) {
    const gyms = prisma.$queryRaw<Gym[]>`
        SELECT * from gyms
        WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
    `;
    return gyms;
  }
}
