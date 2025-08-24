/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import profileService from "@/services/profile.service";

// Create a new profile
export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const profile = await profileService.createProfile(body);
    return NextResponse.json(profile, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error?.message || "Failed to create profile" },
      { status: 500 }
    );
  }
};

// Get all profiles
export const GET = async (req: Request) => {
  try {
    const profiles = await profileService.getAllProfiles();
    return NextResponse.json(profiles, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error?.message || "Failed to fetch profiles" },
      { status: 500 }
    );
  }
};

// Update a profile
export const PUT = async (req: Request) => {
  try {
    const body = await req.json();
    const { id, ...data } = body;

    if (!id) {
      return NextResponse.json({ message: "Profile ID is required" }, { status: 400 });
    }

    const updatedProfile = await profileService.updateProfile(id, data);
    if (!updatedProfile) {
      return NextResponse.json({ message: "Profile not found" }, { status: 404 });
    }

    return NextResponse.json(updatedProfile, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error?.message || "Failed to update profile" },
      { status: 500 }
    );
  }
};
