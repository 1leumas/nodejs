import { UsersInterface } from "@/repositories/users-interface";
import { hash } from "bcryptjs";
import { UserAlreadyExistsError } from "./errors/user-already-exists";

export class RegisterService {
  constructor(private usersRepository: UsersInterface) {}

  async execute(name: string, email: string, password: string) {
    const password_hash = await hash(password, 8);

    const checkIfEmailAlreadyExists = await this.usersRepository.findByEmail(email);
    if (checkIfEmailAlreadyExists) {
      throw new UserAlreadyExistsError();
    }

    await this.usersRepository.create(name, email, password_hash);
  }
}
