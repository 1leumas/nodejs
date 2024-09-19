import { User } from "@prisma/client";
import { UsersInterface } from "../users-interface";

export class InMemoryUsersRepository implements UsersInterface {
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

  async findById(id: string): Promise<User | null> {
    const user = this.items.find((user) => user.id === id);
    if (!user) return null;
    return user;
  }
}
