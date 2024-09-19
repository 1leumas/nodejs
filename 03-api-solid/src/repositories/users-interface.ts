import { User } from "@prisma/client";

export interface UsersInterface {
  create(name: string, email: string, password_hash: string): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
}
