import { tvService } from "@/services/tv.service";
import { handleHttpSuccessResponse } from "@/utils/api/handle-http-success-response";
import { handleHttpErrorResponse } from "@/utils/api/handle-http-error-response";
import { IPaginatedResponse } from "@/types/IPaginatedResult";
import { IMediaItem } from "@/types/IMediaItem";

const CACHE_TTL = 1000 * 60 * 60 * 24; // 24h

const cache: Record<string, { data: IPaginatedResponse<IMediaItem>; expires: number } | null> = {};

export const GET = async (req: Request, { params }: { params: Promise<{ tvId: string }> }) => {
  try {
    const { tvId } = await params;
    const now = Date.now();

    const cached = cache[`similar-${tvId}`];
    if (cached && cached.expires > now) {
      return handleHttpSuccessResponse({
        data: cached.data,
      });
    }

    const results = await tvService.getSimilar(Number(tvId));

    cache[`similar-${tvId}`] = {
      data: results,
      expires: now + CACHE_TTL,
    };

    return handleHttpSuccessResponse({
      data: results,
    });
  } catch (error: unknown) {
    return handleHttpErrorResponse(error);
  }
};
