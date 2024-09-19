import { PrismaCheckInRepository } from "@/repositories/prisma/prisma-check-in-repository";
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";
import { CheckInService } from "../check-in-service";
export function makeCheckInService() {
  const checkInsRepository = new PrismaCheckInRepository();
  const gymsRepository = new PrismaGymsRepository();
  const useCase = new CheckInService(checkInsRepository, gymsRepository);
  return useCase;
}
