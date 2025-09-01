import favoritesService from "@/services/favorites.service";
import { handleHttpErrorResponse } from "@/utils/api/handle-http-error-response";
import { StatusCodes } from "http-status-codes";
import { handleHttpSuccessResponse } from "@/utils/api/handle-http-success-response";
import { IMediaItem } from "@/types/IMediaItem";
import { currentUser } from "@clerk/nextjs/server";

export const GET = async (req: Request) => {
  try {
    const user = await currentUser();
    const userId = user?.id;
    if (!userId) {
      return handleHttpErrorResponse(new Error("Unauthorized"), StatusCodes.UNAUTHORIZED);
    }

    const favorites = await favoritesService.getFavorites(userId);
    return handleHttpSuccessResponse({
      data: { favorites },
    });
  } catch (err) {
    console.error(err);
    return handleHttpErrorResponse(err);
  }
};

export const POST = async (req: Request) => {
  try {
    const user = await currentUser();
    const userId = user?.id;
    if (!userId) {
      return handleHttpErrorResponse(new Error("Unauthorized"), StatusCodes.UNAUTHORIZED);
    }

    const { media }: { media: IMediaItem } = await req.json();
    if (!media) {
      return handleHttpErrorResponse(new Error("Missing media"), StatusCodes.BAD_REQUEST);
    }

    await favoritesService.addFavorite(userId, media);
    return handleHttpSuccessResponse({});
  } catch (err) {
    console.error(err);
    return handleHttpErrorResponse(err);
  }
};

export const DELETE = async (req: Request) => {
  try {
    const user = await currentUser();
    const userId = user?.id;
    if (!userId) {
      return handleHttpErrorResponse(new Error("Unauthorized"), StatusCodes.UNAUTHORIZED);
    }

    const { tmdbId, mediaType }: { tmdbId: number; mediaType: "movie" | "tv" } = await req.json();

    if (!tmdbId || !mediaType) {
      return handleHttpErrorResponse(new Error("Missing parameters"), StatusCodes.BAD_REQUEST);
    }

    await favoritesService.removeFavorite(userId, tmdbId, mediaType);
    return handleHttpSuccessResponse({});
  } catch (err) {
    console.error(err);
    return handleHttpErrorResponse(err);
  }
};
