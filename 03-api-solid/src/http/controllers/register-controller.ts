import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { UserAlreadyExistsError } from "@/services/errors/user-already-exists";
import { makeRegisterService } from "@/services/factories/make-register-service";

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const schema = z.object({
    email: z.string().email(),
    name: z.string(),
    password: z.string().min(6),
  });

  const { name, email, password } = schema.parse(request.body);

  try {
    const registerService = makeRegisterService();
    await registerService.execute(name, email, password);
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: error.message });
    }

    throw error;
  }

  return reply.status(201).send();
}
