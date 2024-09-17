import { prisma } from "@/lib/prisma";
import { UsersInterface } from "@/repositories/users-interface";

export class UsersRepository implements UsersInterface {
  async create(name: string, email: string, password_hash: string) {
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password_hash,
      },
    });
    return user;
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  }
}
