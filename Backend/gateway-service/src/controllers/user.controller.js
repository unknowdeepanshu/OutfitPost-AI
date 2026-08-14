import { getAuth } from "@clerk/express";
import { User } from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { clerkClient } from "../utils/clerkClient.js";

const syncCurrentUser = asyncHandler(async (req, res) => {
  const { userId } = getAuth(req);
  const user = await User.findOne({
    clerkId: userId,
  });

  if (user) {
    return;
    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { message: "User already exists", user },
          "User synced successfully",
        ),
      );
  }
  const clerkUser = await clerkClient.users.getUser(userId);

  const newUser = await new User.create({
    clerkId: clerkUser.id,
    email: clerkUser.emailAddresses[0].emailAddress,
    username: clerkUser.username,
    name: `${clerkUser.firstName ?? ""} ${clerkUser.lastName ?? ""}`,
    avatar: clerkUser.imageUrl,
  });
  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { message: "User already created", newUser },
        "User synced successfully",
      ),
    );
});

export { syncCurrentUser };
