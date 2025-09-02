import { shuffleArray } from "@/utils/global/shuffle-array";
import { handleHttpSuccessResponse } from "@/utils/api/handle-http-success-response";
import { handleHttpErrorResponse } from "@/utils/api/handle-http-error-response";
import moviesService from "@/services/movies.service";

export const GET = async (req: Request) => {
  try {
    const topRatedMovies = await moviesService.getTopRated();

    const results = shuffleArray(topRatedMovies?.results || []);

    return handleHttpSuccessResponse({
      data: { results },
    });
  } catch (error: unknown) {
    return handleHttpErrorResponse(error);
  }
};
