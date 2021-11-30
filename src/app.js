import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";

import pkg from "../package.json";

import inmuebleRoutes from "./routes/inmuebles.routes";
import usersRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";
import solicitudesRoutes from "./routes/solicitudes.routes";

import { createRoles, createAdmin} from "./libs/initialSetup";

const app = express();
createRoles();
createAdmin();

// Settings
app.set("pkg", pkg);
app.set("port", process.env.PORT || 4000);
app.set("json spaces", 4);

// Middlewares
const corsOptions = {
  // origin: "http://localhost:3000",
};
app.use(cors(corsOptions));
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Mensaje de bienvenida API Routes
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to our Inmobiliaria API",
    name: app.get("pkg").name,
    version: app.get("pkg").version,
    description: app.get("pkg").description,
    author: app.get("pkg").author,
  });
});

// Routes
app.use("/api/inmuebles", inmuebleRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/solicitudes",solicitudesRoutes);

export default app;
