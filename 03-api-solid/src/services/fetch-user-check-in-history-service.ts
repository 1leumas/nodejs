import { CheckInInterface } from "@/repositories/checkin-interface";
import { CheckIn } from "@prisma/client";

interface FetchUserCheckInHistoryRequest {
  userId: string;
  page: number;
}

interface FetchUserCheckInHistoryResponse {
  checkIns: CheckIn[];
}

export class FetchUserCheckInHistoryService {
  constructor(private checkInsRepository: CheckInInterface) {}

  async execute({
    userId,
    page,
  }: FetchUserCheckInHistoryRequest): Promise<FetchUserCheckInHistoryResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(
      userId,
      page
    );

    return {
      checkIns,
    };
  }
}
