import { StatusCodes } from "http-status-codes";

import tvService from "@/services/tv.service";
import { handleHttpSuccessResponse } from "@/utils/api/handle-http-success-response";
import { handleHttpErrorResponse } from "@/utils/api/handle-http-error-response";

const CACHE_TTL = 1000 * 60 * 60 * 24; // 24h

const cache: Record<string, { data: unknown; expires: number } | null> = {};

export const GET = async (req: Request, { params }: { params: Promise<{ tvId: string }> }) => {
  try {
    const { tvId } = await params;
    const now = Date.now();

    const cached = cache[tvId];
    if (cached && cached.expires > now) {
      return handleHttpSuccessResponse({
        data: { tv: cached.data, cached: true },
      });
    }

    const tv = await tvService.details(Number(tvId));

    if (!tv || tv === null) {
      return handleHttpErrorResponse(new Error("TV Show not found."), StatusCodes.NOT_FOUND);
    }

    cache[tvId] = { data: tv, expires: now + CACHE_TTL };

    return handleHttpSuccessResponse({
      data: { tv, cached: false },
    });
  } catch (error: unknown) {
    return handleHttpErrorResponse(error);
  }
};
