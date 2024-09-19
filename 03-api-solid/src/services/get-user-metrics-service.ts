import { CheckInInterface } from "@/repositories/checkin-interface";

interface GetUserMetricsRequest {
  userId: string;
}

interface GetUserMetricsResponse {
  checkInsCount: number;
}

export class GetUserMetricsService {
  constructor(private checkInsRepository: CheckInInterface) {}

  async execute({
    userId,
  }: GetUserMetricsRequest): Promise<GetUserMetricsResponse> {
    const checkInsCount = await this.checkInsRepository.countUserCheckInsById(
      userId
    );

    return {
      checkInsCount,
    };
  }
}
