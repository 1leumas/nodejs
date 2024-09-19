import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { makeValidateCheckInService } from "@/services/factories/make-validate-check-in-service";

export async function validate(request: FastifyRequest, reply: FastifyReply) {
  const schema = z.object({
    checkInId: z.string().uuid(),
  });

  const { checkInId } = schema.parse(request.params);

  const validateCheckInService = makeValidateCheckInService();
  await validateCheckInService.execute(checkInId);

  return reply.status(204).send();
}
