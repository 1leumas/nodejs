import { UsersRepository } from "../prisma/prisma-users-repository";
import { User } from "@prisma/client";

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = [];

  async findByEmail(email: string): Promise<User | null> {
    const user = this.items.find((user) => user.email === email);
    if (!user) return null;
    return user;
  }

  async create(
    name: string,
    email: string,
    password_hash: string
  ): Promise<User> {
    const user = {
      id: String(this.items.length + 1),
      name,
      email,
      password_hash,
      created_at: new Date(),
    };

    this.items.push(user);

    return user;
  }
}
