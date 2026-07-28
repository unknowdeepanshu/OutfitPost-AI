import { User } from "../models/user.model.js";
import { Conversation } from "../models/conversation.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { getAuth } from "@clerk/express";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/ApiError.js";

export const createConversation = asyncHandler(async (req, res) => {
    const { userId } = getAuth(req);

    const user = await User.findOne({ clerkId: userId });

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const {
        defaultCategory,
        defaultPlatform,
        includeTextByDefault,
        aiContext,
    } = req.body;

    const conversation = await Conversation.create({
        userId: user._id,
        defaultCategory,
        defaultPlatform,
        includeTextByDefault,
        aiContext,
    })

    return res.status(201)
        .json(new ApiResponse(201, { conversation },
            "Conversation created successfully"));

})