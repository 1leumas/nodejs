import { UsersInterface } from "@/repositories/users-interface";
import bcrypt from "bcryptjs";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { User } from "@prisma/client";

export class AuthenticateService {
  constructor(private usersRepository: UsersInterface) {}

  async execute(email: string, password: string): Promise<{ user: User }> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new InvalidCredentialsError();
    }

    const passwordMatch = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatch) {
      throw new InvalidCredentialsError();
    }

    // const token = sign({ id: user.id }, process.env.JWT_SECRET, {
    //   expiresIn: "1d",
    // });

    return { user };
  }
}
