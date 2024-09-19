import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { makeCheckInService } from "@/services/factories/make-check-in-service";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const paramsSchema = z.object({
    gymId: z.string().uuid(),
  });

  const schema = z.object({
    latitude: z.number().refine((value) => value >= -90 && value <= 90),
    longitude: z.number().refine((value) => value >= -180 && value <= 180),
  });

  const { latitude, longitude } = schema.parse(request.body);

  const gymId = paramsSchema.parse(request.params).gymId;

  const checkInService = makeCheckInService();
  await checkInService.execute({
    gymId,
    userId: request.user.sub,
    userLatitude: latitude,
    userLongitude: longitude,
  });

  return reply.status(201).send();
}
