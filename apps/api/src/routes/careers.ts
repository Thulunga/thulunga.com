import { Router } from "express";
import { prisma } from "@thulunga/database";

export const careersRouter = Router();

// GET /api/careers/opportunities
careersRouter.get("/opportunities", async (req, res) => {
  try {
    const { type, category, remote, northeast, page = "1", limit = "20" } = req.query;

    const where: Record<string, unknown> = {};
    if (type) where.type = type;
    if (category) where.category = category;
    if (remote === "true") where.isRemote = true;
    if (northeast === "true") where.isNortheastSpecific = true;

    const pageNum = parseInt(page as string, 10);
    const limitNum = parseInt(limit as string, 10);

    const [opportunities, total] = await Promise.all([
      prisma.opportunity.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (pageNum - 1) * limitNum,
        take: limitNum,
      }),
      prisma.opportunity.count({ where }),
    ]);

    res.json({
      success: true,
      data: opportunities,
      meta: { page: pageNum, limit: limitNum, total },
    });
  } catch (error) {
    console.error("Error fetching opportunities:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

// GET /api/careers/opportunities/:id
careersRouter.get("/opportunities/:id", async (req, res) => {
  try {
    const opportunity = await prisma.opportunity.findUnique({
      where: { id: req.params.id },
    });

    if (!opportunity) {
      return res.status(404).json({ success: false, error: "Opportunity not found" });
    }

    res.json({ success: true, data: opportunity });
  } catch (error) {
    console.error("Error fetching opportunity:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

// GET /api/careers/paths
careersRouter.get("/paths", async (_req, res) => {
  try {
    const paths = await prisma.careerPath.findMany({
      include: { steps: { orderBy: { order: "asc" } } },
      orderBy: { createdAt: "desc" },
    });

    res.json({ success: true, data: paths });
  } catch (error) {
    console.error("Error fetching career paths:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

// GET /api/careers/paths/:slug
careersRouter.get("/paths/:slug", async (req, res) => {
  try {
    const path = await prisma.careerPath.findUnique({
      where: { slug: req.params.slug },
      include: { steps: { orderBy: { order: "asc" } } },
    });

    if (!path) {
      return res.status(404).json({ success: false, error: "Career path not found" });
    }

    res.json({ success: true, data: path });
  } catch (error) {
    console.error("Error fetching career path:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});
