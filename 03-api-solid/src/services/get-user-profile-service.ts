import { UsersInterface } from "@/repositories/users-interface";
import { User } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

export class GetUserProfileService {
  constructor(private usersRepository: UsersInterface) {}

  async execute(userId: string): Promise<{ user: User }> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new ResourceNotFoundError();
    }

    return { user };
  }
}
