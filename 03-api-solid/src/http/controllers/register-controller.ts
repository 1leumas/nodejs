import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { RegisterService } from "@/services/register-service";
import { UsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { UserAlreadyExistsError } from "@/services/errors/user-already-exists";

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const schema = z.object({
    email: z.string().email(),
    name: z.string(),
    password: z.string().min(6),
  });

  const { name, email, password } = schema.parse(request.body);

  try {
    const usersRepository = new UsersRepository();
    const registerService = new RegisterService(usersRepository);
    await registerService.execute(name, email, password);
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: error.message });
    }

    throw error;
  }

  return reply.status(201).send();
}
