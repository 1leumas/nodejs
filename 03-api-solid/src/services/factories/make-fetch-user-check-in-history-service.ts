import { PrismaCheckInRepository } from "@/repositories/prisma/prisma-check-in-repository";
import { FetchUserCheckInHistoryService } from "../fetch-user-check-in-history-service";
export function makeFetchUserCheckInHistoryService() {
  const checkInsRepository = new PrismaCheckInRepository();
  const useCase = new FetchUserCheckInHistoryService(checkInsRepository);
  return useCase;
}
