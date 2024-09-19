import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { makeFetchUserCheckInHistoryService } from "@/services/factories/make-fetch-user-check-in-history-service";

export async function history(request: FastifyRequest, reply: FastifyReply) {
  const schema = z.object({
    page: z.coerce.number().min(1).default(1),
  });

  const { page } = schema.parse(request.query);

  const fetchHistoryService = makeFetchUserCheckInHistoryService();
  const { checkIns } = await fetchHistoryService.execute({
    userId: request.user.sub,
    page,
  });

  return reply.status(200).send(checkIns);
}
