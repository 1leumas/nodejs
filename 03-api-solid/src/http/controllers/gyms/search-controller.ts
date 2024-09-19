import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { makeSearchGymsService } from "@/services/factories/make-search-gyms-service";

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const schema = z.object({
    query: z.string(),
    page: z.coerce.number().min(1).default(1),
  });

  const { query, page } = schema.parse(request.query);

  const searchService = makeSearchGymsService();
  const { gyms } = await searchService.execute(query, page);

  return reply.status(200).send(gyms);
}
