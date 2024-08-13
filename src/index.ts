import express, { Express } from "express";
import * as dotenv from "dotenv";
import { dblink } from "./database/connect";
import { errorMiddleware } from "./utils/errorMiddleware";
import { router } from "./routes/main-router";
import cors from "cors";
import { IUser } from "./models/userModel";

dotenv.config();

declare global {
  namespace Express {
    interface Request {
      user: IUser
    }
  }
}

const PORT: string = process.env.PORT;
const HOST: string = process.env.HOST;

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use("",router);
app.use(errorMiddleware);

async function connections() {
  await dblink.connect();
}

app.listen(Number.parseInt(PORT), HOST, async () => {
  await connections();
  console.log(`listening on ${HOST} ${PORT}`);
});