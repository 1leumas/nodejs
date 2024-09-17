import { UsersInterface } from "@/repositories/users-interface";
import bcrypt from "bcryptjs";
import { UserAlreadyExistsError } from "./errors/user-already-exists";
import { User } from "@prisma/client";

export class RegisterService {
  constructor(private usersRepository: UsersInterface) {}

  async execute(
    name: string,
    email: string,
    password: string
  ): Promise<{ user: User }> {
    const password_hash = await bcrypt.hash(password, 8);

    const checkIfEmailAlreadyExists = await this.usersRepository.findByEmail(
      email
    );

    if (checkIfEmailAlreadyExists) {
      throw new UserAlreadyExistsError();
    }

    const user = await this.usersRepository.create(name, email, password_hash);
    return { user };
  }
}
