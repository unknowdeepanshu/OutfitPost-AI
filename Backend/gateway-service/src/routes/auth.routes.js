import { Router } from "express";
import { requireAuth, getAuth } from "@clerk/express";

const router = Router();

router.get("/me", requireAuth(), (req, res) => {
  const { userId, sessionClaims } = getAuth(req);

  res.status(200).json({
    success: true,
    userId,
    sessionClaims,
  });
});

export default router;