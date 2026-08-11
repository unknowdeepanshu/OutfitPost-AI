import { User } from "../models/user.model.js";
import { Conversation } from "../models/conversation.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { getAuth } from "@clerk/express";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

const createConversation = asyncHandler(async (req, res) => {
    // 1. Get authentication information from Clerk
    const { isAuthenticated, userId } = getAuth(req);

    // 2. Make sure the request is authenticated
    if (!isAuthenticated || !userId) {
        throw new ApiError(401, "Unauthorized");
    }

    // 3. Find the corresponding MongoDB user
    const user = await User.findOne({
        clerkUserId: userId,
    });

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    // 4. Get conversation data from the request body
    const {
        title,
        defaultCategory,
        defaultPlatform,
        includeTextByDefault,
        aiContext,
    } = req.body;

    // 5. Create the conversation
    const conversation = await Conversation.create({
        userId: user._id,
        title,
        defaultCategory,
        defaultPlatform,
        includeTextByDefault,
        aiContext,
    });

    // 6. Send response
    return res
        .status(201)
        .json(
            new ApiResponse(
                201,
                { conversation },
                "Conversation created successfully"
            )
        );
});

const getConversations = asyncHandler(async (req, res) => {
    const { isAuthenticated, userId } = getAuth(req);

    if (!isAuthenticated || !userId) {
        throw new ApiError(401, "Unauthorized");
    }

    const user = await User.findOne({
        clerkUserId: userId,
    });

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const conversations = await Conversation.find({
        userId: user._id,
    })
        .sort({ lastMessageAt: -1 })
        .lean();

    return res.status(200).json(
        new ApiResponse(
            200,
            { conversations },
            "Conversations fetched successfully"
        )
    );
});

const getConversationById = asyncHandler(async (req, res) => {
    // 1. Get authenticated Clerk user
    const { isAuthenticated, userId } = getAuth(req);

    // 2. Make sure request is authenticated
    if (!isAuthenticated || !userId) {
        throw new ApiError(401, "Unauthorized");
    }

    // 3. Find corresponding MongoDB user
    const user = await User.findOne({
        clerkUserId: userId,
    });

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    // 4. Get conversation ID from URL
    const { conversationId } = req.params;

    // 5. Find conversation belonging to this user
    const conversation = await Conversation.findOne({
        _id: conversationId,
        userId: user._id,
    }).lean();

    // 6. Conversation doesn't exist or doesn't belong to user
    if (!conversation) {
        throw new ApiError(404, "Conversation not found");
    }

    // 7. Send response
    return res.status(200).json(
        new ApiResponse(
            200,
            { conversation },
            "Conversation fetched successfully"
        )
    );
});

const deleteConversation = asyncHandler(async (req, res) => {
    // 1. Get authenticated Clerk user
    const { isAuthenticated, userId } = getAuth(req);

    // 2. Make sure the user is authenticated
    if (!isAuthenticated || !userId) {
        throw new ApiError(401, "Unauthorized");
    }

    // 3. Find the corresponding MongoDB user
    const user = await User.findOne({
        clerkUserId: userId,
    });

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    // 4. Get conversation ID from URL
    const { conversationId } = req.params;

    // 5. Find the conversation belonging to this user
    const conversation = await Conversation.findOne({
        _id: conversationId,
        userId: user._id,
    });

    // 6. Stop if conversation doesn't exist or doesn't belong to user
    if (!conversation) {
        throw new ApiError(404, "Conversation not found");
    }

    // 7. Delete the conversation
    await conversation.deleteOne();

    // 8. Return success response
    return res.status(200).json(
        new ApiResponse(
            200,
            { conversationId },
            "Conversation deleted successfully"
        )
    );
});

const updateConversation = asyncHandler(async (req, res) => {
    // 1. Get authenticated Clerk user
    const { isAuthenticated, userId } = getAuth(req);

    // 2. Make sure the user is authenticated
    if (!isAuthenticated || !userId) {
        throw new ApiError(401, "Unauthorized");
    }

    // 3. Find the corresponding MongoDB user
    const user = await User.findOne({
        clerkUserId: userId,
    });

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    // 4. Get conversation ID from URL
    const { conversationId } = req.params;

    // 5. Extract only fields that the client is allowed to update
    const {
        title,
        defaultCategory,
        defaultPlatform,
        includeTextByDefault,
        aiContext,
    } = req.body;

    // 6. Build the update object
    const updates = {};

    if (title !== undefined) {
        updates.title = title;
    }

    if (defaultCategory !== undefined) {
        updates.defaultCategory = defaultCategory;
    }

    if (defaultPlatform !== undefined) {
        updates.defaultPlatform = defaultPlatform;
    }

    if (includeTextByDefault !== undefined) {
        updates.includeTextByDefault = includeTextByDefault;
    }

    if (aiContext !== undefined) {
        updates.aiContext = aiContext;
    }

    // 7. Make sure there is actually something to update
    if (Object.keys(updates).length === 0) {
        throw new ApiError(400, "No valid fields provided for update");
    }

    // 8. Find and update only this user's conversation
    const conversation = await Conversation.findOneAndUpdate(
        {
            _id: conversationId,
            userId: user._id,
        },
        {
            $set: updates,
        },
        {
            new: true,
            runValidators: true,
        }
    ).lean();

    // 9. Conversation doesn't exist or doesn't belong to user
    if (!conversation) {
        throw new ApiError(404, "Conversation not found");
    }

    // 10. Return updated conversation
    return res.status(200).json(
        new ApiResponse(
            200,
            { conversation },
            "Conversation updated successfully"
        )
    );
});

export {createConversation, 
    getConversations,
    getConversationById,
    deleteConversation,
    updateConversation
};
