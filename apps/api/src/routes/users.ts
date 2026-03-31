import { Router } from "express";
import { prisma } from "@thulunga/database";

export const usersRouter = Router();

// GET /api/users/profile/:clerkId
usersRouter.get("/profile/:clerkId", async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { clerkId: req.params.clerkId },
    });

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    res.json({ success: true, data: user });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

// POST /api/users/sync (Clerk webhook will call this)
usersRouter.post("/sync", async (req, res) => {
  try {
    const { clerkId, name, email } = req.body;

    const user = await prisma.user.upsert({
      where: { clerkId },
      update: { name, email },
      create: { clerkId, name, email },
    });

    res.json({ success: true, data: user });
  } catch (error) {
    console.error("Error syncing user:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});
