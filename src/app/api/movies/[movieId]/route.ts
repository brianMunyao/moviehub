import { StatusCodes } from "http-status-codes";

import { handleHttpSuccessResponse } from "@/utils/api/handle-http-success-response";
import { handleHttpErrorResponse } from "@/utils/api/handle-http-error-response";
import moviesService from "@/services/movies.service";

const CACHE_TTL = 1000 * 60 * 60 * 24; // 24h

const cache: Record<string, { data: unknown; expires: number } | null> = {};

export const GET = async (req: Request, { params }: { params: Promise<{ movieId: string }> }) => {
  try {
    const { movieId } = await params;
    const now = Date.now();

    const cached = cache[movieId];
    if (cached && cached.expires > now) {
      return handleHttpSuccessResponse({
        data: { movie: cached.data, cached: true },
      });
    }

    const movie = await moviesService.details(Number(movieId));

    if (!movie || movie === null) {
      return handleHttpErrorResponse(new Error("Movie not found."), StatusCodes.NOT_FOUND);
    }

    cache[movieId] = { data: movie, expires: now + CACHE_TTL };

    return handleHttpSuccessResponse({
      data: { movie, cached: false },
    });
  } catch (error: unknown) {
    return handleHttpErrorResponse(error);
  }
};
