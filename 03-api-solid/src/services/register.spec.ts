import { expect, describe, it } from "vitest";
import { RegisterService } from "./register-service";
import { compare } from "bcryptjs";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { UserAlreadyExistsError } from "./errors/user-already-exists";

const name = "John Doe";
const email = "email@example.com";
const password = "password123";

describe("Register Service", () => {
  it("should be able to register", async () => {
    // Arrange
    const repo = new InMemoryUsersRepository();
    const registerService = new RegisterService(repo);

    // Act
    await registerService.execute(name, email, password);

    // Assert
    const user = await repo.findByEmail(email);
    expect(user).toBeDefined();
  });

  it("should hash user password upon registration", async () => {
    // Arrange
    const repo = new InMemoryUsersRepository();
    const registerService = new RegisterService(repo);

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
    // Arrange
    const repo = new InMemoryUsersRepository();
    const registerService = new RegisterService(repo);

    // Act
    await registerService.execute(name, email, password);

    // Assert
    await expect(() =>
      registerService.execute(name, email, password)
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
