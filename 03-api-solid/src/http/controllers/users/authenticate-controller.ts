import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { makeAuthenticateService } from "@/services/factories/make-authenticate-service";
import { InvalidCredentialsError } from "@/services/errors/invalid-credentials-error";

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, password } = schema.parse(request.body);

  try {
    const authenticateService = makeAuthenticateService();
    const { user } = await authenticateService.execute(email, password);

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
        },
      }
    );

    return reply.status(200).send({
      token,
    });
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: error.message });
    }
    throw error;
  }
}
