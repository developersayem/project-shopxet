import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { loggerMiddleware } from "./middlewares/loggerMiddleware";
import session from "express-session";
import { errorHandler } from "./middlewares/error.middleware";
import path from "path";

const app = express();

// ============================
// CORS Setup
// ============================
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || process.env.ALLOWED_ORIGINS?.split(",").includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Required when behind proxy (e.g. Nginx/Cloudflare)
app.set("trust proxy", 1);

// ============================
// Parsers & Static
// ============================
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());

// Serve static assets
app.use("/public", express.static(path.join(process.cwd(), "public")));
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// ============================
// Middlewares
// ============================
app.use(loggerMiddleware);

// Sessions (optional, for passport.js)
app.use(
  session({
    secret: process.env.SESSION_SECRET || "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    },
  })
);

// ============================
// Routes
// ============================
import authRoutes from "./routes/auth.routes";
import productRoutes from "./routes/admin/product.routes";
import categoryRoutes from "./routes/admin/category.routes";
import collectionRoutes from "./routes/collection.routes";
import orderRoutes from "./routes/admin/order.routes";
import siteSettingsRoutes from "./routes/admin/siteSettings.routes";

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/collections", collectionRoutes);
app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/site-settings", siteSettingsRoutes);

// ============================
// Global Error Handler
// ============================
app.use(errorHandler);

export { app };
