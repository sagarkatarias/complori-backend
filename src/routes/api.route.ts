import { Router, Request, Response, NextFunction } from "express";
import { Prisma, PrismaClient } from "@prisma/client";

const router: Router = Router();
const prisma: PrismaClient = new PrismaClient();

router.get("/", async (req: Request, res: Response) => {
  res.send({ message: "Ok api is working 🚀" });
});

router.get(
  "/courses",
  async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const courses = await prisma.course.findMany({});
      res.status(200).json(courses);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/courses/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const courses = await prisma.course.findUnique({
        where: {
          id: parseInt(req.params.id),
        },
      });
      res.status(200).json(courses);
    } catch (error) {
      next(error);
    }
  }
);

router.post("/courses", async (req: Request, res: Response) => {
  try {
    const course = await prisma.course.create({
      data: req.body,
    });

    res.status(201).json(course);
  } catch (error: unknown) {
    const prismaError = error as Prisma.PrismaClientKnownRequestError;
    const { code, meta } = prismaError;
    if (code === "P2002") {
      const { target } = meta as Record<string, unknown>;
      res.status(400).json({
        message: `Duplicate field error: ${target}`,
      });
    }
  }
});

router.delete(
  "/courses/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const course = await prisma.course.delete({
        where: {
          id: parseInt(req.params.id),
        },
      });
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
);

router.patch("/courses/:id", async (req: Request, res: Response) => {
  try {
    const course = await prisma.course.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: req.body,
    });
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: "Error updating course" });
  }
});

router.get(
  "/coaches",
  async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const coaches = await prisma.coach.findMany({});
      res.json(coaches);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/coaches/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const coach = await prisma.coach.findUnique({
        where: {
          id: parseInt(req.params.id),
        },
      });
      res.json(coach);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/coaches",
  async (req: Request, res: Response, _next: NextFunction) => {
    console.log(req.body);
    try {
      const coach = await prisma.coach.create({
        data: req.body,
      });

      res.json(coach);
    } catch (error: unknown) {
      const prismaError = error as Prisma.PrismaClientKnownRequestError;
      const { code, meta } = prismaError;
      if (code === "P2002") {
        const { target } = meta as Record<string, unknown>;
        res.status(400).json({
          message: `Duplicate field error: ${target}`,
        });
      }
    }
  }
);

// Error-handling middleware
router.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json({ message: "Internal Server Error" });
});

module.exports = router;
