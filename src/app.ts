import { Request, Response, NextFunction, Application } from "express";
import express from "express";
import createHttpError from "http-errors";
import morgan from "morgan";
import dotenv from "dotenv";
import { Server } from "http";
import cors from "cors";

const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
dotenv.config();
app.use(cors());

/* app.get("/", async (req, res, next) => {
  res.send({ message: "Awesome it works 🐻" });
}); */

app.use("/api", require("./routes/api.route"));

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});

const PORT = process.env.PORT || 5001;
const server: Server = app.listen(PORT, () =>
  console.log(`🚀 @ http://localhost:${PORT}`)
);
