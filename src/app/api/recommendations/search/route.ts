import moviesService from "@/services/movies.service";
import tvService from "@/services/tv.service";
import { handleHttpSuccessResponse } from "@/utils/api/handle-http-success-response";
import { handleHttpErrorResponse } from "@/utils/api/handle-http-error-response";
import { IMediaItem, IMediaType } from "@/types/IMediaItem";
import recommendationService from "@/services/recommendation.service";
import { IPaginatedResponse } from "@/types/IPaginatedResult";

export const GET = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url);

    const page = parseInt(searchParams.get("page") || "1", 10);
    const query = searchParams.get("query") ?? "";
    const category = (searchParams.get("category") ?? "all") as IMediaType | "all";
    const genres = searchParams.get("genres") || ""; // comma-separated
    const genresArray = genres ? genres.split(",").map((g) => parseInt(g, 10)) : [];

    const yearRaw = searchParams.get("year");
    const year = yearRaw ? parseInt(yearRaw, 10) : undefined;

    let response: IPaginatedResponse<IMediaItem>;

    if (category === "movie") {
      response = await moviesService.search(query, { year, page });

      if (genresArray.length > 0) {
        response.results = response.results.filter((item) =>
          item.genre_ids?.some((id) => genresArray.includes(id))
        );
      }
    } else if (category === "tv") {
      response = await tvService.search(query, { page, year });

      if (genresArray.length > 0) {
        response.results = response.results.filter((item) =>
          item.genre_ids?.some((id) => genresArray.includes(id))
        );
      }

      if (year) {
        response.results = response.results.filter((item) => {
          const firstAirYear = item.first_air_date
            ? new Date(item.first_air_date).getFullYear()
            : null;
          return firstAirYear === year;
        });
      }
    } else {
      response = await recommendationService.searchAll(query, { page });

      if (genresArray.length > 0) {
        response.results = response.results.filter((item) =>
          item.genre_ids?.some((id) => genresArray.includes(id))
        );
      }

      if (year) {
        response.results = response.results.filter((item) => {
          const dateStr = item.release_date || item.first_air_date;
          if (!dateStr) return false;
          return new Date(dateStr).getFullYear() === year;
        });
      }
    }

    const total_results = response.results.length;
    const total_pages = Math.max(1, Math.ceil(total_results / 20));

    return handleHttpSuccessResponse({
      data: {
        ...response,
        total_results,
        total_pages,
        page: Math.min(page, total_pages),
      },
    });
  } catch (error: unknown) {
    return handleHttpErrorResponse(error);
  }
};
