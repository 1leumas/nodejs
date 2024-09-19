import { expect, describe, it, beforeEach } from "vitest";
import { RegisterService } from "./register-service";
import { compare } from "bcryptjs";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

const name = "John Doe";
const email = "email@example.com";
const password = "password123";

let repo: InMemoryUsersRepository;
let registerService: RegisterService;

describe("Register Service", () => {
  beforeEach(() => {
    repo = new InMemoryUsersRepository();
    registerService = new RegisterService(repo);
  })

  it("should be able to register", async () => {
    // Act
    await registerService.execute(name, email, password);

    // Assert
    const user = await repo.findByEmail(email);
    expect(user).toBeDefined();
  });

  it("should hash user password upon registration", async () => {
    // Act
    const { user } = await registerService.execute(name, email, password);
    const isPasswordCorrectlyHashed = await compare(
      password,
      user.password_hash
    );

    // Assert
    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it("should not be able to create user with duplicate emails", async () => {
    // Act
    await registerService.execute(name, email, password);

    // Assert
    await expect(() =>
      registerService.execute(name, email, password)
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
