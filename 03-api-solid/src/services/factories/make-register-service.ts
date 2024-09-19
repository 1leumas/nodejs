import { UsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { RegisterService } from "../register-service";

export function makeRegisterService() {
  const usersRepository = new UsersRepository();
  const registerService = new RegisterService(usersRepository);

  return registerService;
}
