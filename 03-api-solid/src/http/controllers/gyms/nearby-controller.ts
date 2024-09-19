import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { makeSearchGymsService } from "@/services/factories/make-search-gyms-service";
import { makeFetchNearbyGymsService } from "@/services/factories/make-fetch-nearby-gyms-service";

export async function nearby(request: FastifyRequest, reply: FastifyReply) {
  const schema = z.object({
    latitude: z.number().refine((value) => value >= -90 && value <= 90),
    longitude: z.number().refine((value) => value >= -180 && value <= 180),
  });

  const { latitude, longitude } = schema.parse(request.query);

  const nearbyGymsService = makeFetchNearbyGymsService();
  const { gyms } = await nearbyGymsService.execute(latitude, longitude);

  return reply.status(200).send(gyms);
}
