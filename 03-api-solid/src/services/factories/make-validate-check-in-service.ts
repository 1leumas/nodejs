import { PrismaCheckInRepository } from "@/repositories/prisma/prisma-check-in-repository";
import { ValidateCheckInService } from "../validate-check-in-service";
export function makeValidateCheckInService() {
  const checkInsRepository = new PrismaCheckInRepository();
  const useCase = new ValidateCheckInService(checkInsRepository);
  return useCase;
}
