import { shuffleArray } from "@/utils/global/shuffle-array";
import { handleHttpSuccessResponse } from "@/utils/api/handle-http-success-response";
import { handleHttpErrorResponse } from "@/utils/api/handle-http-error-response";
import recommendationService from "@/services/recommendation.service";
import { IMediaType } from "@/types/IMediaItem";

export const GET = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url);

    const mediaType = (searchParams.get("mediaType") as IMediaType | "all") || undefined;
    const timeWindow = (searchParams.get("timeWindow") as "day" | "week") || undefined;

    const trending = await recommendationService.trending(mediaType, timeWindow);

    const results = shuffleArray(trending?.results || []);

    return handleHttpSuccessResponse({
      data: { results },
    });
  } catch (error: unknown) {
    return handleHttpErrorResponse(error);
  }
};
