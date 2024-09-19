import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { makeCreateGymService } from "@/services/factories/make-create-gym-service";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const schema = z.object({
    title: z.string(),
    description: z.string().nullable(),
    phone: z.string().nullable(),
    latitude: z.number().refine((value) => value >= -90 && value <= 90),
    longitude: z.number().refine((value) => value >= -180 && value <= 180),
  });

  const { title, description, phone, latitude, longitude } = schema.parse(
    request.body
  );

  const createService = makeCreateGymService();
  await createService.execute(title, description, phone, latitude, longitude);

  return reply.status(201).send();
}
