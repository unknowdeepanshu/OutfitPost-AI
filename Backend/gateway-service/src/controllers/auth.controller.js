import { verifyWebhook } from "@clerk/express/webhooks";
import { getAuth } from "@clerk/express";
import { User } from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { clerkClient } from "../utils/clerkClient.js";

const UserCreated = asyncHandler(async (req, res) => {
  try {
    const evt = await verifyWebhook(req);

    const { id } = evt.data;
    const eventType = evt.type;
    console.log(
      `Received webhook with ID ${id} and event type of ${eventType}`,
    );
    console.log("Webhook payload:", evt.data);
    const userData = evt.data;
    res.send("Webhook received");
    const newUser = await User.create({
      clerkUserId: userData.id,
      email: userData.email_addresses[0].email_address,
      name: `${userData.first_name ?? ""} ${userData.last_name ?? ""}`,
      avatar: userData.profile_image_url,
    });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    res.status(400).send("Error verifying webhook");
  }
});

export { UserCreated };
