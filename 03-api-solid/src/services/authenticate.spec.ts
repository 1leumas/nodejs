import { expect, describe, it, beforeEach } from "vitest";
import { AuthenticateService } from "./authenticate-service";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import bcrypt from "bcryptjs";
import { InvalidCredentialsError } from "./errors/invalid-credentials";

const name = "John Doe";
const email = "email@example.com";
const password = "password123";

let repo: InMemoryUsersRepository;
let authenticateService: AuthenticateService;

describe("Authenticate Service", () => {
  beforeEach(() => {
    repo = new InMemoryUsersRepository();
    authenticateService = new AuthenticateService(repo);
  });

  it("should be able to authenticate an user", async () => {
    // Arrange
    const password_hash = await bcrypt.hash(password, 8);
    await repo.create(name, email, password_hash); // Create user

    // Act
    const auth = await authenticateService.execute(email, password);

    // Assert
    expect(auth).toBeDefined();
  });

  it("should not be able to authenticate with wrong email", async () => {
    // Act & Assert
    await expect(
      authenticateService.execute(email, password)
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should not be able to authenticate with wrong password", async () => {
    // Arrange
    await repo.create(name, email, password); // Create user

    // Act & Assert
    await expect(
      authenticateService.execute(email, "password")
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
