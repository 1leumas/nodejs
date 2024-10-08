import { makeGetUserProfileService } from "@/services/factories/make-get-user-profile-service";
import { FastifyRequest, FastifyReply } from "fastify";

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const getUserProfileService = makeGetUserProfileService();

  const { user } = await getUserProfileService.execute(request.user.sub);

  return reply.status(200).send({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
    },
  });
}
