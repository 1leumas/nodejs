import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import bcrypt from "bcryptjs";
import { GetUserProfileService } from "./get-user-profile-service";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

const name = "John Doe";
const email = "email@example.com";
const password = "password123";

let repo: InMemoryUsersRepository;
let getUserProfileService: GetUserProfileService;

describe("Get User Profile Service", () => {
  beforeEach(() => {
    repo = new InMemoryUsersRepository();
    getUserProfileService = new GetUserProfileService(repo);
  });

  it("should be able to return an user profile", async () => {
    // Arrange
    const password_hash = await bcrypt.hash(password, 8);
    const createdUser = await repo.create(name, email, password_hash); // Create user

    // Act
    const user = await getUserProfileService.execute(createdUser.id);

    // Assert
    expect(user).toBeDefined();
  });

  it("should not be able to return an user profile with wrong id", async () => {
    // Assert
    await expect(getUserProfileService.execute("1")).rejects.toBeInstanceOf(
      ResourceNotFoundError
    );
  });
});
