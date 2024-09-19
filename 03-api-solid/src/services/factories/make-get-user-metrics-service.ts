import { PrismaCheckInRepository } from "@/repositories/prisma/prisma-check-in-repository";
import { GetUserMetricsService } from "../get-user-metrics-service";
export function makeGetUserMetricsService() {
  const checkInsRepository = new PrismaCheckInRepository();
  const useCase = new GetUserMetricsService(checkInsRepository);
  return useCase;
}
