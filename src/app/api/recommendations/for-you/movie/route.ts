import { handleHttpSuccessResponse } from "@/utils/api/handle-http-success-response";
import { handleHttpErrorResponse } from "@/utils/api/handle-http-error-response";
import favoritesService from "@/services/favorites.service";
import { currentUser } from "@clerk/nextjs/server";
import { StatusCodes } from "http-status-codes";
import recommendationService from "@/services/recommendation.service";

export const GET = async (req: Request) => {
  try {
    const user = await currentUser();
    const userId = user?.id;

    if (!userId) {
      return handleHttpErrorResponse(new Error("Unauthorized"), StatusCodes.UNAUTHORIZED);
    }

    const favorites = (await favoritesService.getFavorites(userId)).filter(
      (movie) => movie.media_type === "movie"
    );

    if (!favorites || favorites.length === 0) {
      const paginatedMovies = await recommendationService.discover("movie");
      return handleHttpSuccessResponse({ data: paginatedMovies });
    }

    const randomFavorite = favorites[Math.floor(Math.random() * favorites.length)];

    const paginatedMovies = await recommendationService.getRecommendations(
      "movie",
      randomFavorite.id
    );

    return handleHttpSuccessResponse({
      data: paginatedMovies,
    });
  } catch (err) {
    console.error(err);
    return handleHttpErrorResponse(err);
  }
};
