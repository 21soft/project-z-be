import compression from "compression";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import routes from "./routes";
import { ServerConfig } from "./config/config";

// Create express server
const app = express();
const serverConfig = ServerConfig

app.set('port', serverConfig.port)

// middleware
app.use(cors());
app.use(morgan(serverConfig.nodeEnv === "development" ? "dev" : "tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(helmet());

// Route config
app.use("/", routes);

export default app