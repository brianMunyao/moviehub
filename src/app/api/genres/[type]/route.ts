import moviesService from "@/services/movies.service";
import tvService from "@/services/tv.service";
import { handleHttpSuccessResponse } from "@/utils/api/handle-http-success-response";
import { handleHttpErrorResponse } from "@/utils/api/handle-http-error-response";
import { IGenre } from "@/types/IGenre";
import { IMediaType } from "@/types/IMediaItem";

type MediaTypeWithAll = IMediaType | "all";

const cache: Record<MediaTypeWithAll, { data: IGenre[]; expires: number } | null> = {
  movie: null,
  tv: null,
  all: null,
};

const CACHE_TTL = 1000 * 60 * 60 * 24; // 24h

export const GET = async (
  req: Request,
  { params }: { params: { type: MediaTypeWithAll; id: string } }
) => {
  try {
    const { type } = params;
    const now = Date.now();

    // return from cache if valid
    if (cache[type] && cache[type]!.expires > now) {
      return handleHttpSuccessResponse({
        data: { genres: cache[type]!.data, cached: true },
      });
    }

    let genres: IGenre[] = [];

    if (type === "movie") {
      genres = (await moviesService.genres()).map((genre: IGenre) => ({
        ...genre,
        mediaType: "movie",
      }));
    } else if (type === "tv") {
      genres = (await tvService.genres()).map((genre: IGenre) => ({
        ...genre,
        mediaType: "tv",
      }));
    } else if (type === "all") {
      const [movieGenres, tvGenres] = await Promise.all([
        moviesService.genres(),
        tvService.genres(),
      ]);

      genres = [
        ...movieGenres.map((g: IGenre) => ({ ...g, mediaType: "movie" as IMediaType })),
        ...tvGenres.map((g: IGenre) => ({ ...g, mediaType: "tv" as IMediaType })),
      ];
    }

    // cache it
    cache[type] = { data: genres, expires: now + CACHE_TTL };

    return handleHttpSuccessResponse({
      data: { genres, cached: false },
    });
  } catch (error: unknown) {
    return handleHttpErrorResponse(error);
  }
};
