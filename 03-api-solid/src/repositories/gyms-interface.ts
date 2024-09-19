import { Gym } from "@prisma/client";

export interface GymsInterface {
  findById(id: string): Promise<Gym | null>;
  create(
    id: string | null,
    title: string,
    description: string | null,
    phone: string | null,
    latitude: number,
    longitude: number
  ): Promise<Gym>;
  searchManyByTitle(query: string, page: number): Promise<Gym[]>;
  findManyNearby(latitude: number, longitude: number): Promise<Gym[]>;
}
