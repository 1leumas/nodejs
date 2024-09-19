import { UsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { AuthenticateService } from "../authenticate-service";

export function makeAuthenticateService() {
  const usersRepository = new UsersRepository();
  const authenticateService = new AuthenticateService(usersRepository);

  return authenticateService;
}
