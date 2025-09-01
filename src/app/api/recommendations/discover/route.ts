import moviesService from "@/services/movies.service";
import tvService from "@/services/tv.service";
import { shuffleArray } from "@/utils/global/shuffle-array";
import { handleHttpSuccessResponse } from "@/utils/api/handle-http-success-response";
import { handleHttpErrorResponse } from "@/utils/api/handle-http-error-response";

export const GET = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);

    const genres = searchParams.get("genres") || "";

    const movieData = await moviesService.discover({ page, with_genres: genres });
    const tvData = await tvService.discover({ page, with_genres: genres });

    const results = shuffleArray([...movieData.results, ...tvData.results]);

    return handleHttpSuccessResponse({
      data: { results },
    });
  } catch (error: unknown) {
    return handleHttpErrorResponse(error);
  }
};
